const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model.js');
const notificationModel = require('../models//notification_model.js');
const cardModelGenerator = require('../models/card_model.js');
const { auth } = require('../supplemental/middleware');
const sr_stages = require('../supplemental/sr_stages');

// @route ------ GET api/sr/cards
// @desc ------- Get Study Regime cards
// @access ----- Private

router.get('/cards', auth, async (req, res) => {
  try {
    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const filterObj = {
      studyRegime: true,
    };
    const sortObj = { creation_date: -1 };

    const cards = await cardModel.find(filterObj).sort(sortObj);

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
    });

    const in_time_num = all_num - repeat_num;

    const notif = await notificationModel.find({ user_id: server_id }).sort({ time: -1 }).limit(1); // ???

    const next_num = notif ? notif.number : 0;
    const next_date = notif ? notif.time : false;

    res.status(200).json({ all_num, repeat_num, in_time_num, next_num, next_date });
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
    let { _id, answer } = req.query;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    const cardModel = cardModelGenerator(user.username);

    const card = await cardModel.findOne({
      _id,
    });

    let stage = determine_stage(card) + (answer ? 1 : -1);
    if (stage <= 0 || stage > 11) stage = 1;

    const { nextRep, prevStage } = get_dates(card);

    card.stage = stage;
    card.nextRep = nextRep;
    card.prevStage = prevStage;
    card.lastRep = new Date();

    await card.save();

    res.status(200).json({ msg: 'The answer has been recorded' });
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

    await cardModel.updateMany(
      { _id: { $in: _id_arr } },
      {
        stage: 1,
        nextRep: new Date(),
        prevStage: new Date(),
        lastRep: new Date(),
      }
    );

    res.status(200).json({ msg: 'Study regime has been dropped' });
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

  for (let i = stage - 3; i >= 0; i--) {
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
