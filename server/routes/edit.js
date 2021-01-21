const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model.js');
const cardModelGenerator = require('../models/card_model.js');
const moduleModelGenerator = require('../models/module_model.js');
const { auth } = require('../supplemental/middleware');
const { notification_timeout } = require('../supplemental/notifications_control');

// @route ------ DELETE api/edit/module
// @desc ------- Delete a module
// @access ----- Private

router.delete('/module', auth, async (req, res) => {
  try {
    let { _id } = req.query;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const moduleModel = moduleModelGenerator(user.username);
    const cardModel = cardModelGenerator(user.username);

    await moduleModel.deleteOne({ _id });
    await cardModel.deleteMany({ moduleID: _id });

    res.status(200).json({ msg: 'The module has been deleted.' });

    await notification_timeout(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

// @route ------ DELETE api/edit/card
// @desc ------- Delete a card
// @access ----- Private

router.delete('/card', auth, async (req, res) => {
  try {
    let { _id } = req.query;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    const card = await cardModel.findOne({ _id });

    await cardModel.deleteOne({ _id });

    const number = await cardModel.countDocuments({
      moduleID: card.moduleID,
    });

    await moduleModel.updateOne({ _id: card.moduleID }, { number });

    res.status(200).json({ msg: 'The card has been deleted.' });

    await notification_timeout(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

// @route ------ PUT api/edit/module
// @desc ------- Edit a module
// @access ----- Private

router.put('/module', auth, async (req, res) => {
  try {
    const module_data = req.body;

    const { _id } = module_data;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const moduleModel = moduleModelGenerator(user.username);

    const module = await moduleModel.findOne({
      _id,
    });

    module.title = module_data.title;

    await module.save();

    res.status(200).json({ msg: 'The module has been edited.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

// @route ------ PUT api/edit/card
// @desc ------- Edit a card
// @access ----- Private

router.put('/card', auth, async (req, res) => {
  try {
    const card_data = req.body;

    const { _id } = card_data;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const card = await cardModel.findOne({
      _id,
    });

    card.term = card_data.term;
    card.defenition = card_data.defenition;
    card.imgurl = card_data.imgurl;

    await card.save();

    res.status(200).json({ msg: 'The card has been edited.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

// @route ------ POST api/edit/module
// @desc ------- Create a module
// @access ----- Private

router.post('/module', auth, async (req, res) => {
  try {
    const { _id_arr } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const moduleModel = moduleModelGenerator(user.username);
    const cardModel = cardModelGenerator(user.username);

    const draft = await moduleModel.findOne({ draft: true });

    const new_module = await moduleModel.create({
      title: draft.title,
      author: user.username,
      author_id: user.server_id,
      number: _id_arr.length,
      creation_date: new Date(),
      draft: false,
    });

    await cardModel.updateMany({ _id: { $in: _id_arr } }, { moduleID: new_module._id });

    const number = await cardModel.countDocuments({
      moduleID: draft._id,
    });

    if (!number) {
      await moduleModel.deleteOne({ draft: true });
    } else {
      draft.title = '';
      draft.number = number;
      await draft.save();
    }

    res.status(200).json({ msg: 'A new module has been created.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

// @route ------ POST api/edit/card
// @desc ------- Create a card
// @access ----- Private

router.post('/card', auth, async (req, res) => {
  try {
    const { module } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    // moduleID, term, defenition, imgurl

    const new_card = await cardModel.create({
      moduleID: module._id,
      term: '',
      defenition: '',
      imgurl: '',
      creation_date: new Date(),
      studyRegime: false,
      stage: 1,
      nextRep: new Date(),
      prevStage: new Date(),
    });

    const number = await cardModel.countDocuments({
      moduleID: module._id,
    });

    await moduleModel.updateOne({ _id: module._id }, { number });

    res.status(200).json(new_card);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

// @route ------ GET api/edit/draft
// @desc ------- Get draft or create and get a new draft
// @access ----- Private

router.get('/draft', auth, async (req, res) => {
  try {
    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    let module, cards;

    module = await moduleModel.findOne({
      draft: true,
    });

    if (module) {
      cards = await cardModel.find({ moduleID: module._id }).sort({ creation_date: -1 });
    } else {
      // Create a new draft
      module = await moduleModel.create({
        title: '',
        author: user.username,
        author_id: user.server_id,
        number: 5,
        creation_date: new Date(),
        draft: true,
      });

      // cardModel
      const cardsData = [];

      for (let i = 0; i < 5; i++) {
        cardsData.push({
          moduleID: module._id,
          term: '',
          defenition: '',
          imgurl: '',
          creation_date: new Date(Date.now() + i),
          studyRegime: false,
          stage: 1,
          nextRep: new Date(),
          prevStage: new Date(),
        });
      }

      cards = await cardModel.create(cardsData);
    }

    res.status(200).json({ module, cards });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ----------------

module.exports = router;
