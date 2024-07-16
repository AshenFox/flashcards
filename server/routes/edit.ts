import express, { Request, Response } from "express";

import cardModel from "../models/card_model";
import moduleModel from "../models/module_model";
import userModel from "../models/user_model";
import middleware from "../supplemental/middleware";
import { notification_timeout } from "../supplemental/notifications_control";
import { ICard, ICardBase } from "./../models/card_model";
import { IModule } from "./../models/module_model";

const { auth } = middleware;
const router = express.Router();

interface IResError {
  errorBody: string;
}

interface IResMessage {
  msg: string;
}

// @route ------ DELETE api/edit/module
// @desc ------- Delete a module
// @access ----- Private

interface IModuleDeleteQuery extends qs.ParsedQs {
  _id: string;
}

type TModuleDeleteReq = Request<any, any, any, IModuleDeleteQuery>;

type TModuleDeleteRes = Response<IResMessage | IResError>;

router.delete(
  "/module",
  auth,
  async (req: TModuleDeleteReq, res: TModuleDeleteRes) => {
    try {
      let { _id } = req.query;

      const server_id = req.user.server_id;

      const user = await userModel.findOne({
        server_id,
      });

      if (!user) throw new Error(`User ${server_id} has not been found.`);

      await moduleModel.deleteOne({ _id });
      await cardModel.deleteMany({ moduleID: _id });

      res.status(200).json({ msg: "The module has been deleted." });

      await notification_timeout(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// ----------------

// @route ------ DELETE api/edit/card
// @desc ------- Delete a card
// @access ----- Private

interface ICardDeleteQuery extends qs.ParsedQs {
  _id: string;
}

type TCardDeleteReq = Request<any, any, any, ICardDeleteQuery>;

type TCardDeleteRes = Response<IResMessage | IResError>;

router.delete(
  "/card",
  auth,
  async (req: TCardDeleteReq, res: TCardDeleteRes) => {
    try {
      let { _id } = req.query;

      const server_id = req.user.server_id;

      const user = await userModel.findOne({
        server_id,
      });

      if (!user) throw new Error(`User ${server_id} has not been found.`);

      const card = await cardModel.findOne({ _id });

      if (!card) throw new Error(`Card ${_id} has not been found.`);

      await cardModel.deleteOne({ _id });

      const number = await cardModel.countDocuments({
        moduleID: card.moduleID,
      });

      await moduleModel.updateOne({ _id: card.moduleID }, { number });

      res.status(200).json({ msg: "The card has been deleted." });

      await notification_timeout(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// ----------------

// @route ------ PUT api/edit/module
// @desc ------- Edit a module
// @access ----- Private

type TModulePutReq = Request<any, any, IModule>;

type TModulePutRes = Response<IResMessage | IResError>;

router.put("/module", auth, async (req: TModulePutReq, res: TModulePutRes) => {
  try {
    const module_data = req.body;

    const { _id } = module_data;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    /* eslint-disable */
    const module = await moduleModel.findOne({
      _id,
    });

    if (!module) throw new Error(`Module ${_id} has not been found.`);

    module.title = module_data.title;

    await module.save();

    res.status(200).json({ msg: "The module has been edited." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

// @route ------ PUT api/edit/card
// @desc ------- Edit a card
// @access ----- Private

type TCardPutReq = Request<any, any, ICard>;

type TCardPutRes = Response<IResMessage | IResError>;

router.put("/card", auth, async (req: TCardPutReq, res: TCardPutRes) => {
  try {
    const card_data = req.body;

    const { _id } = card_data;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const card = await cardModel.findOne({
      _id,
    });

    if (!card) throw new Error(`Card ${_id} has not been found.`);

    card.term = card_data.term;
    card.definition = card_data.definition;
    card.imgurl = card_data.imgurl;

    await card.save();

    res.status(200).json({ msg: "The card has been edited." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

// @route ------ POST api/edit/module
// @desc ------- Create a module
// @access ----- Private

interface IModulePostReqBody {
  _id_arr: string[];
}

type TModulePostReq = Request<any, any, IModulePostReqBody>;

type TModulePostRes = Response<IResMessage | IResError>;

router.post(
  "/module",
  auth,
  async (req: TModulePostReq, res: TModulePostRes) => {
    try {
      const { _id_arr } = req.body;

      const server_id = req.user.server_id;

      const user = await userModel.findOne({
        server_id,
      });

      if (!user) throw new Error(`User ${server_id} has not been found.`);

      const draft = await moduleModel.findOne({
        author_id: user.id,
        draft: true,
      });

      if (!draft)
        throw new Error(`Draft for user ${user.username} has not been found.`);

      const new_module = await moduleModel.create({
        title: draft.title,
        author: user.username,
        author_id: user.server_id,
        number: _id_arr.length,
        creation_date: new Date(),
        draft: false,
      });

      await cardModel.updateMany(
        { _id: { $in: _id_arr } },
        { moduleID: new_module._id },
      );

      const number = await cardModel.countDocuments({
        moduleID: draft._id,
      });

      if (!number) {
        await moduleModel.deleteOne({ author_id: user.id, draft: true });
      } else {
        draft.title = "";
        draft.number = number;
        await draft.save();
      }

      res.status(200).json({ msg: "A new module has been created." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// ----------------

// @route ------ POST api/edit/card
// @desc ------- Create a card
// @access ----- Private

interface ICardPostReqBody {
  module: IModule;
}

type TCardPostReq = Request<any, any, ICardPostReqBody>;

type TCardPostRes = Response<ICard | IResError>;

router.post("/card", auth, async (req: TCardPostReq, res: TCardPostRes) => {
  try {
    const { module } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const new_card = await cardModel.create({
      moduleID: module._id,
      term: "",
      definition: "",
      imgurl: "",
      creation_date: new Date(),
      studyRegime: false,
      stage: 1,
      nextRep: new Date(),
      prevStage: new Date(),
      author_id: user.server_id,
      author: user.username,
    });

    const number = await cardModel.countDocuments({
      moduleID: module._id,
    });

    await moduleModel.updateOne({ _id: module._id }, { number });

    res.status(200).json(new_card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

// @route ------ GET api/edit/draft
// @desc ------- Get draft or create and get a new draft
// @access ----- Private

interface IDraftGetResBody {
  module: IModule;
  cards: ICard[];
}

type TDraftGetRes = Response<IDraftGetResBody | IResError>;

router.get("/draft", auth, async (req: Request, res: TDraftGetRes) => {
  try {
    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    let module: IModule | null, cards: ICard[];

    module = await moduleModel.findOne({
      draft: true,
    });

    if (module) {
      cards = await cardModel
        .find({ moduleID: module._id })
        .sort({ creation_date: 1 });
    } else {
      // Create a new draft
      module = await moduleModel.create({
        title: "",
        author: user.username,
        author_id: user.server_id,
        number: 5,
        creation_date: new Date(),
        draft: true,
      });

      const cardsData: ICardBase[] = [];

      for (let i = 0; i < 5; i++) {
        cardsData.push({
          moduleID: module._id,
          term: "",
          definition: "",
          imgurl: "",
          creation_date: new Date(Date.now() + i),
          studyRegime: false,
          stage: 1,
          nextRep: new Date(),
          prevStage: new Date(),
          lastRep: new Date(),
          author_id: user.server_id,
          author: user.username,
        });
      }

      cards = await cardModel.create(cardsData);
    }

    res.status(200).json({ module, cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

export default router;
