import {
  Card,
  CardBase,
  ErrorResponse,
  GetEditDraftQuery,
  GetEditDraftResponse,
  Module,
} from "@flashcards/common";
import cardModel from "@models/card_model";
import moduleModel from "@models/module_model";
import { auth } from "@supplemental/middleware";
import { notification_timeout } from "@supplemental/notifications_control";
import { ResponseLocals } from "@supplemental/types";
import express, { Request, Response } from "express";
import { FilterQuery } from "mongoose";

const router = express.Router();

type ResError = {
  errorBody: string;
};

type ResBody = {
  msg: string;
};

// @route ------ DELETE api/edit/module
// @desc ------- Delete a module
// @access ----- Private

type ModuleDeleteQuery = qs.ParsedQs & {
  _id: string;
};

type ModuleDeleteReq = Request<any, any, any, ModuleDeleteQuery>;

type ModuleDeleteRes = ResponseLocals<ResBody | ResError>;

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

type CardDeleteResBody = {
  cards: Card[];
};

type CardDeleteRes = ResponseLocals<(ResBody & CardDeleteResBody) | ResError>;

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

    await moduleModel.updateOne(
      { _id: card.moduleID, author_id: _id },
      {
        number: cards.length,
        numberSR: cards.filter(card => card.studyRegime).length,
      },
    );

    res.status(200).json({ msg: "The card has been deleted.", cards });

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

type ModulePutRes = Response<ResBody | ResError>;

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

type CardPutRes = Response<ResBody | ResError>;

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

type ModulePostRes = Response<ResBody | ResError>;

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
      numberSR: 0,
      creation_date: new Date(),
      draft: false,
    });

    const new_module_cards = await cardModel
      .find({ _id: { $in: _id_arr }, author_id: _id })
      .sort({ order: 1 });

    await Promise.all(
      new_module_cards.map(async (card, i) => {
        card.order = i;
        card.moduleID = new_module._id;
        return await card.save();
      }),
    );

    const draft_cards = await cardModel
      .find({
        moduleID: draft._id,
        author_id: _id,
      })
      .sort({ order: 1 });

    if (!draft_cards.length) {
      await moduleModel.deleteOne({ author_id: _id, draft: true });
    } else {
      draft.title = "";
      draft.number = draft_cards.length;
      await draft.save();
    }

    await Promise.all(
      draft_cards.map(async (card, i) => {
        card.order = i;
        return await card.save();
      }),
    );

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

type CardPostResBody = {
  cards: Card[];
};

type CardPostReq = Request<any, any, CardPostReqBody>;

type CardPostRes = Response<CardPostResBody | ResError>;

router.post("/card", auth, async (req: CardPostReq, res: CardPostRes) => {
  try {
    const { module, position } = req.body;

    const user = res.locals.user;
    const { _id } = user;

    let cards = await cardModel
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

    await cardModel.create({
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

    cards = await cardModel
      .find({
        author_id: _id,
        moduleID: module._id,
      })
      .sort({ order: 1 });

    await moduleModel.updateOne(
      { _id: module._id, author_id: _id },
      {
        number: cards.length,
      },
    );

    res.status(200).json({ cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

// @route ------ GET api/edit/draft
// @desc ------- Get draft or create and get a new draft
// @access ----- Private

type GetMainModuleReq = Request<any, any, any, GetEditDraftQuery>;

type GetMainModuleRes = ResponseLocals<
  GetEditDraftResponse | ErrorResponse,
  GetEditDraftQuery
>;

router.get(
  "/draft",
  auth,
  async (req: GetMainModuleReq, res: GetMainModuleRes) => {
    try {
      const user = res.locals.user;
      const { _id } = user;

      let foundModule: Module | null;
      let cards: Card[];

      foundModule = await moduleModel.findOne({
        author_id: _id,
        draft: true,
      });

      const filterObj: FilterQuery<Card> = {
        author_id: _id,
      };

      if (foundModule) {
        filterObj.moduleID = foundModule._id;

        cards = await cardModel.find(filterObj).sort({ order: 1 });
      } else {
        // Create a new draft
        foundModule = await moduleModel.create({
          title: "",
          author: user.username,
          author_id: _id,
          number: 5,
          numberSR: 0,
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

      const all = await cardModel.countDocuments(filterObj);

      res.status(200).json({
        module: foundModule,
        cards: {
          entries: cards,
          pagination: {
            page: 0,
            number: all,
            all,
            end: true,
          },
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// ----------------

export default router;
