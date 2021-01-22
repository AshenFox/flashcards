const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model.js');
const notificationModel = require('../models//notification_model.js');
const cardModelGenerator = require('../models/card_model.js');
const { auth } = require('../supplemental/middleware');
const sr_stages = require('../supplemental/sr_stages');
const { notification_timeout } = require('../supplemental/notifications_control');

// @route ------ GET api/sr/cards
// @desc ------- Get Study Regime cards
// @access ----- Private

router.get('/cards', auth, async (req, res) => {
  try {
    let { number } = req.query;

    if (number) {
      number = parseInt(number);
    } else {
      number = 0;
    }

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const filterObj = {
      studyRegime: true,
      nextRep: { $lte: new Date() },
    };
    const sortObj = { creation_date: -1 };

    const cards = await cardModel.find(filterObj).sort(sortObj).limit(number);

    res.status(200).json({ cards });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/sr/count
// @desc ------- Get Study Regime cards numbers
// @access ----- Private

router.get('/count', auth, async (req, res) => {
  try {
    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const all_num = await cardModel.countDocuments({
      studyRegime: true,
    });

    const repeat_num = await cardModel.countDocuments({
      nextRep: { $lte: new Date() },
      studyRegime: true,
    });

    const notif = await notificationModel
      .findOne({ user_id: user._id })
      .sort({ time: 1 });
    // ???

    const next_num = notif ? notif.number : 0;
    const next_date = notif ? notif.time : false;

    res.status(200).json({ all_num, repeat_num, next_num, next_date });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ PUT api/sr/answer
// @desc ------- Edit card stage depending on the user's answer
// @access ----- Private

router.put('/answer', auth, async (req, res) => {
  try {
    const { _id, answer } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const card = await cardModel.findOne({
      _id,
    });

    let studyRegime = true;

    let stage = determine_stage(card) + answer;
    if (stage <= 0 || stage > 11) stage = 1;
    if (card.stage >= 11 && stage === 1) studyRegime = false;

    const { nextRep, prevStage } = get_dates(stage);

    const fields = {
      stage,
      nextRep,
      prevStage,
      lastRep: new Date(),
      studyRegime,
    };

    await cardModel.updateOne(
      {
        _id,
      },
      fields
    );

    res.status(200).json(fields);

    await notification_timeout(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ PUT api/sr/control
// @desc ------- Control on/off card/cards study regime
// @access ----- Private

router.put('/control', auth, async (req, res) => {
  try {
    const { _id_arr, study_regime } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    await cardModel.updateMany({ _id: { $in: _id_arr } }, { studyRegime: study_regime });

    res.status(200).json({ msg: 'Study regime has been controlled' });

    await notification_timeout(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ PUT api/sr/drop
// @desc ------- Drop card/cards study regime
// @access ----- Private

router.put('/drop', auth, async (req, res) => {
  try {
    const { _id_arr } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const fields = {
      stage: 1,
      nextRep: new Date(),
      prevStage: new Date(),
      lastRep: new Date(),
    };

    await cardModel.updateMany({ _id: { $in: _id_arr } }, fields);

    res.status(200).json(fields);

    await notification_timeout(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// ===================

module.exports = router;

const determine_stage = (card) => {
  let delay = Date.now() - card.prevStage.getTime();
  let stage = card.stage;

  if (stage === 1) return 1;

  for (let i = stage - 2; i >= 0; i--) {
    delay = delay - sr_stages[i].prevStage;
    if (delay <= 0) {
      return sr_stages[i].stage;
    }
  }

  if (delay > 0) return 1;
};

const get_dates = (stage) => {
  let nextRep;
  let prevStage;

  if (stage === 1) {
    nextRep = new Date();
    prevStage = new Date();
  } else {
    nextRep = new Date(Date.now() + sr_stages[stage - 2].nextRep);
    prevStage = new Date(Date.now() + sr_stages[stage - 2].prevStage);
  }

  return { nextRep, prevStage };
};
