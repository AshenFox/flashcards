import { Card, CardBase, Module } from "@common/types";
import cardModel from "@models/card_model";
import moduleModel from "@models/module_model";
import middleware from "@supplemental/middleware";
import { notification_timeout } from "@supplemental/notifications_control";
import { ResponseLocals } from "@supplemental/types";
import express, { Request, Response } from "express";

const { auth } = middleware;
const router = express.Router();

type ResError = {
  errorBody: string;
};

type ResMessage = {
  msg: string;
};

// @route ------ DELETE api/edit/module
// @desc ------- Delete a module
// @access ----- Private

type ModuleDeleteQuery = qs.ParsedQs & {
  _id: string;
};

type ModuleDeleteReq = Request<any, any, any, ModuleDeleteQuery>;

type ModuleDeleteRes = ResponseLocals<ResMessage | ResError>;

router.delete(
  "/module",
  auth,
  async (req: ModuleDeleteReq, res: ModuleDeleteRes) => {
    try {
      let { _id: module_id } = req.query;

      const user = res.locals.user;
      const { _id } = user;

      await moduleModel.deleteOne({ _id: module_id, author_id: _id });
      await cardModel.deleteMany({ moduleID: module_id, author_id: _id });

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

type CardDeleteQuery = qs.ParsedQs & {
  _id: string;
};

type CardDeleteReq = Request<any, any, any, CardDeleteQuery>;

type CardDeleteRes = ResponseLocals<ResMessage | ResError>;

router.delete("/card", auth, async (req: CardDeleteReq, res: CardDeleteRes) => {
  try {
    let { _id: card_id } = req.query;

    const user = res.locals.user;
    const { _id } = user;

    const card = await cardModel.findOne({ _id: card_id, author_id: _id });

    if (!card) throw new Error(`Card ${card_id} has not been found.`);

    await cardModel.deleteOne({ _id: card_id, author_id: _id });

    const cards = await cardModel
      .find({ author_id: _id, moduleID: card.moduleID })
      .sort({ order: 1 });

    await Promise.all(
      cards.map(async (card, i) => {
        card.order = i;
        return await card.save();
      }),
    );

    const number = await cardModel.countDocuments({
      moduleID: card.moduleID,
      author_id: _id,
    });

    await moduleModel.updateOne(
      { _id: card.moduleID, author_id: _id },
      { number },
    );

    res.status(200).json({ msg: "The card has been deleted." });

    await notification_timeout(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

// @route ------ PUT api/edit/module
// @desc ------- Edit a module
// @access ----- Private

type ModulePutReq = Request<any, any, Module>;

type ModulePutRes = Response<ResMessage | ResError>;

router.put("/module", auth, async (req: ModulePutReq, res: ModulePutRes) => {
  try {
    const module_data = req.body;

    const { _id: module_id } = module_data;

    const _id = res.locals.user._id;

    const foundModule = await moduleModel.findOne({
      author_id: _id,
      _id: module_id,
    });

    if (!foundModule)
      throw new Error(`Module ${module_id} has not been found.`);

    foundModule.title = module_data.title;

    await foundModule.save();

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

type CardPutReq = Request<any, any, Card>;

type CardPutRes = Response<ResMessage | ResError>;

router.put("/card", auth, async (req: CardPutReq, res: CardPutRes) => {
  try {
    const card_data = req.body;

    const { _id: card_id } = card_data;

    const _id = res.locals.user._id;

    const card = await cardModel.findOne({
      author_id: _id,
      _id: card_id,
    });

    if (!card) throw new Error(`Card ${card_id} has not been found.`);

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

type ModulePostReqBody = {
  _id_arr: string[];
};

type ModulePostReq = Request<any, any, ModulePostReqBody>;

type ModulePostRes = Response<ResMessage | ResError>;

router.post("/module", auth, async (req: ModulePostReq, res: ModulePostRes) => {
  try {
    const { _id_arr } = req.body;

    const user = res.locals.user;
    const { _id } = user;

    const draft = await moduleModel.findOne({
      author_id: _id,
      draft: true,
    });

    if (!draft)
      throw new Error(`Draft for user ${user.username} has not been found.`);

    const new_module = await moduleModel.create({
      author: user.username,
      author_id: user._id,
      title: draft.title,
      number: _id_arr.length,
      creation_date: new Date(),
      draft: false,
    });

    await cardModel.updateMany(
      { _id: { $in: _id_arr }, author_id: _id },
      { moduleID: new_module._id },
    );

    const number = await cardModel.countDocuments({
      moduleID: draft._id,
      author_id: _id,
    });

    if (!number) {
      await moduleModel.deleteOne({ author_id: _id, draft: true });
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
});

// ----------------

// @route ------ POST api/edit/card
// @desc ------- Create a card
// @access ----- Private

type CardPostReqBody = {
  module: Module;
  position?: "start" | "end";
};

type CardPostReq = Request<any, any, CardPostReqBody>;

type CardPostRes = Response<Card | ResError>;

router.post("/card", auth, async (req: CardPostReq, res: CardPostRes) => {
  try {
    const { module, position } = req.body;

    const user = res.locals.user;
    const { _id } = user;

    const cards = await cardModel
      .find({ author_id: _id, moduleID: module._id })
      .sort({ order: 1 });

    let order = cards.length;

    if (position === "start") {
      order = 0;

      await Promise.all(
        cards.map(async card => {
          card.order += 1;
          return await card.save();
        }),
      );
    } else if (position === "end") order = cards.length;

    const new_card = await cardModel.create({
      moduleID: module._id,
      term: "",
      definition: "",
      imgurl: "",
      creation_date: new Date(),
      studyRegime: false,
      stage: 1,
      order,
      nextRep: new Date(),
      prevStage: new Date(),
      author_id: _id,
      author: user.username,
    });

    const number = await cardModel.countDocuments({
      author_id: _id,
      moduleID: module._id,
    });

    await moduleModel.updateOne(
      { _id: module._id, author_id: _id },
      { number },
    );

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

type DraftGetResBody = {
  module: Module;
  cards: Card[];
};

type DraftGetRes = Response<DraftGetResBody | ResError>;

router.get("/draft", auth, async (req: Request, res: DraftGetRes) => {
  try {
    const user = res.locals.user;
    const { _id } = user;

    let foundModule: Module | null;
    let cards: Card[];

    foundModule = await moduleModel.findOne({
      author_id: _id,
      draft: true,
    });

    if (foundModule) {
      cards = await cardModel
        .find({ author_id: _id, moduleID: foundModule._id })
        .sort({ creation_date: 1 });
    } else {
      // Create a new draft
      foundModule = await moduleModel.create({
        title: "",
        author: user.username,
        author_id: _id,
        number: 5,
        creation_date: new Date(),
        draft: true,
      });

      const cardsData: CardBase[] = [];

      for (let i = 0; i < 5; i++) {
        cardsData.push({
          moduleID: foundModule._id,
          term: "",
          definition: "",
          imgurl: "",
          creation_date: new Date(Date.now() + i),
          studyRegime: false,
          stage: 1,
          order: i,
          nextRep: new Date(),
          prevStage: new Date(),
          lastRep: new Date(),
          author_id: _id,
          author: user.username,
        });
      }

      cards = await cardModel.create(cardsData);
    }

    res.status(200).json({ module: foundModule, cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

export default router;
