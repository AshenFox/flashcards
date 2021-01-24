const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model.js');
const cardModelGenerator = require('../models/card_model.js');
const moduleModelGenerator = require('../models/module_model.js');
const { auth } = require('../supplemental/middleware');

// @route ------ GET api/main/modules
// @desc ------- Get user modules
// @access ----- Private

router.get('/modules', auth, async (req, res) => {
  try {
    let { skip, filter, created } = req.query;
    skip = parseInt(skip);

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const moduleModel = moduleModelGenerator(user.username);

    let draft = await moduleModel.findOne({
      draft: true,
    });

    let all_modules_number = await moduleModel.estimatedDocumentCount();

    const filterObj = {
      draft: false,
    };

    const sortObj = {};
    if (created === 'newest') sortObj.creation_date = -1;
    if (created === 'oldest') sortObj.creation_date = 1;

    if (filter)
      filterObj.title = {
        $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
      };

    const modules = await moduleModel
      .find(filterObj)
      .sort(sortObj)
      .skip(skip * 10)
      .limit(10);

    const modules_number = await moduleModel.countDocuments(filterObj);

    if (draft) --all_modules_number;

    const all_modules = all_modules_number <= (skip + 1) * 10;

    const result = {
      draft: false,
      modules,
      modules_number,
      all_modules,
      all_modules_number,
    };

    if (!filter) result.draft = draft;

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/main/cards
// @desc ------- Get user cards
// @access ----- Private

router.get('/cards', auth, async (req, res) => {
  try {
    let { skip, filter, by, created } = req.query;
    skip = parseInt(skip);

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    const draft = await moduleModel.findOne({
      draft: true,
    });

    const filterObj = draft ? { moduleID: { $ne: draft._id } } : {};

    const sortObj = {};
    if (created === 'newest') sortObj.creation_date = -1;
    if (created === 'oldest') sortObj.creation_date = 1;

    const all_cards_number = await cardModel.countDocuments(filterObj);

    if (filter)
      filterObj[by] = {
        $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
      };

    const cards = await cardModel
      .find(filterObj)
      .sort(sortObj)
      .skip(skip * 10)
      .limit(10);

    const cards_number = await cardModel.countDocuments(filterObj);

    const all_cards = cards_number <= (skip + 1) * 10;

    res.status(200).json({ cards, cards_number, all_cards, all_cards_number });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/main/module
// @desc ------- Get module with cards
// @access ----- Private

router.get('/module', auth, async (req, res) => {
  try {
    let { _id } = req.query;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    const module = await moduleModel.findOne({
      _id,
    });

    if (module.draft) throw new Error('Can not get draft');

    const cards = await cardModel.find({ moduleID: _id });

    res.status(200).json({ module, cards });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/main/module/cards
// @desc ------- Get only the module's cards
// @access ----- Private

router.get('/module/cards', auth, async (req, res) => {
  try {
    let { _id, filter, by, created } = req.query;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const filterObj = { moduleID: _id };

    const sortObj = {};
    if (created === 'newest') sortObj.creation_date = -1;
    if (created === 'oldest') sortObj.creation_date = 1;

    if (filter)
      filterObj[by] = {
        $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
      };

    const cards = await cardModel.find(filterObj).sort(sortObj);

    res.status(200).json({ cards });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

module.exports = router;
