import express, { Request, Response } from "express";

import notificationModel from "../models//notification_model";
import cardModelGenerator, { ICard, ICardSortObj } from "../models/card_model";
import userModel from "../models/user_model";
import middleware from "../supplemental/middleware";
import { notification_timeout } from "../supplemental/notifications_control";
import sr_stages from "../supplemental/sr_stages";

const { auth } = middleware;
const router = express.Router();

interface IResError {
  errorBody: string;
}

// @route ------ GET api/sr/cards
// @desc ------- Get Study Regime cards
// @access ----- Private

interface ICardsGetQuery extends qs.ParsedQs {
  number: string;
}

type TCardsGetReq = Request<any, any, any, ICardsGetQuery>;

interface ICardsGetResBody {
  cards: ICard[];
}

type TCardsGetRes = Response<ICardsGetResBody | IResError>;

router.get("/cards", auth, async (req: TCardsGetReq, res: TCardsGetRes) => {
  try {
    let { number } = req.query;

    let numCards: number;

    if (number) {
      numCards = parseInt(number);
    } else {
      numCards = 0;
    }

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const cardModel = cardModelGenerator(user.username);

    const filterObj = {
      studyRegime: true,
      nextRep: { $lte: new Date() },
    };
    const sortObj: ICardSortObj = { creation_date: -1 };

    const cards = await cardModel.find(filterObj).sort(sortObj).limit(numCards);

    res.status(200).json({ cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ GET api/sr/count
// @desc ------- Get Study Regime cards numbers
// @access ----- Private

interface ICountGetResBody {
  all_num: number;
  repeat_num: number;
  next_num: number;
  next_date: false | Date;
}

type TCountGetRes = Response<ICountGetResBody | IResError>;

router.get("/count", auth, async (req: Request, res: TCountGetRes) => {
  try {
    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const cardModel = cardModelGenerator(user.username);

    const all_num = await cardModel.countDocuments({
      studyRegime: true,
    });

    const repeat_num = await cardModel.countDocuments({
      nextRep: { $lte: new Date() },
      studyRegime: true,
    });

    const notif = await notificationModel
      .findOne({ user_id: user._id, number: { $gt: 0 } })
      .sort({ time: 1 });

    const next_num = notif ? notif.number : 0;
    const next_date = notif ? notif.time : false;

    res.status(200).json({ all_num, repeat_num, next_num, next_date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ PUT api/sr/answer
// @desc ------- Edit card stage depending on the user's answer
// @access ----- Private

interface IAnswerPutBody {
  _id: string;
  answer: number;
}

type TAnswerPutReq = Request<any, any, IAnswerPutBody>;

interface IAnswerPutResBody {
  stage: number;
  nextRep: Date;
  prevStage: Date;
  lastRep: Date;
  studyRegime: boolean;
}

type TAnswerPutRes = Response<IAnswerPutResBody | IResError>;

router.put("/answer", auth, async (req: TAnswerPutReq, res: TAnswerPutRes) => {
  try {
    const { _id, answer } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const cardModel = cardModelGenerator(user.username);

    const card = await cardModel.findOne({
      _id,
    });

    if (!card) throw new Error(`Card ${_id} has not been found.`);

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
      fields,
    );

    res.status(200).json(fields);

    await notification_timeout(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ PUT api/sr/control
// @desc ------- Control on/off card/cards study regime
// @access ----- Private

interface IControlPutBody {
  _id_arr: string[];
  study_regime: boolean;
}

type TControlPutReq = Request<any, any, IControlPutBody>;

interface IControlPutResBody {
  msg: "Study regime has been controlled";
}

type TControlPutRes = Response<IControlPutResBody | IResError>;

router.put(
  "/control",
  auth,
  async (req: TControlPutReq, res: TControlPutRes) => {
    try {
      const { _id_arr, study_regime } = req.body;

      const server_id = req.user.server_id;

      const user = await userModel.findOne({
        server_id,
      });

      if (!user) throw new Error(`User ${server_id} has not been found.`);

      const cardModel = cardModelGenerator(user.username);

      await cardModel.updateMany(
        { _id: { $in: _id_arr } },
        { studyRegime: study_regime },
      );

      res.status(200).json({ msg: "Study regime has been controlled" });

      await notification_timeout(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ PUT api/sr/drop
// @desc ------- Drop card/cards study regime
// @access ----- Private

interface IDropPutBody {
  _id_arr: string[];
}

type TDropPutReq = Request<any, any, IDropPutBody>;

interface IDropPutResBody {
  stage: number;
  nextRep: Date;
  prevStage: Date;
  lastRep: Date;
}

type TDropPutRes = Response<IDropPutResBody | IResError>;

router.put("/drop", auth, async (req: TDropPutReq, res: TDropPutRes) => {
  try {
    const { _id_arr } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

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
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ===================

export default router;

const determine_stage = (card: ICard): number => {
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

  return 1;
};

const get_dates = (stage: number) => {
  let nextRep: Date;
  let prevStage: Date;

  if (stage === 1) {
    nextRep = new Date();
    prevStage = new Date();
  } else {
    nextRep = new Date(Date.now() + sr_stages[stage - 2].nextRep);
    prevStage = new Date(Date.now() + sr_stages[stage - 2].prevStage);
  }

  return { nextRep, prevStage };
};
