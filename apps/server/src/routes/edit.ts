import {
  Card,
  CardBase,
  ErrorResponse,
  GetEditDraftQuery,
  GetEditDraftResponse,
  Module,
} from "@flashcards/common";
import cardModel, { updateModuleNumberSR } from "@models/card_model";
import moduleModel from "@models/module_model";
import { auth } from "@supplemental/middleware";
import { notification_timeout } from "@supplemental/notifications_control";
import { ResponseLocals } from "@supplemental/types";
import express, { Request, Response } from "express";
import { AnyKeys, FilterQuery, Types } from "mongoose";

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
  msg: string;
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

    const moduleId = card.moduleID;

    await moduleModel.updateOne(
      { _id: moduleId, author_id: _id },
      {
        $pull: { cards: card_id },
      },
    );
    await cardModel.deleteOne({ _id: card_id, author_id: _id });

    // Update numberSR after deleting the card
    await updateModuleNumberSR(moduleId, _id);

    const { cards = [] } =
      (await moduleModel
        .findOne({ _id: moduleId, author_id: _id })
        .populate<{ cards: Card[] }>({
          path: "cards",
        })) ?? {};

    // I'm only sending the cards to the client and not the module which can lead to client not being able to update the module's card count
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

    let draft = await moduleModel.findOne({
      author_id: _id,
      draft: true,
    });

    if (!draft)
      throw new Error(`Draft for user ${user.username} has not been found.`);

    const ref_id_arr = _id_arr.map(id => new Types.ObjectId(id));

    const new_module = await moduleModel.create({
      author: user.username,
      author_id: user._id,
      title: draft.title,
      creation_date: new Date(),
      draft: false,
      cards: ref_id_arr,
      tags: [],
    });

    const new_module_cards = await cardModel.find({
      _id: { $in: _id_arr },
      author_id: _id,
    });

    await Promise.all(
      new_module_cards.map(async card => {
        card.moduleID = new Types.ObjectId(new_module._id);
        return await card.save();
      }),
    );

    await moduleModel.updateOne(
      { _id: draft._id },
      { $pull: { cards: { $in: ref_id_arr } } },
    );

    // Update the numberSR field for both the draft and the new module
    await updateModuleNumberSR(draft._id, _id);
    await updateModuleNumberSR(new_module._id, _id);

    draft = await moduleModel.findOne({
      author_id: _id,
      draft: true,
    });

    if (draft) {
      if (!draft.cards.length) {
        await moduleModel.deleteOne({ author_id: _id, draft: true });
      } else {
        draft.title = "";
        await draft.save();
      }
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
      lastRep: new Date(),
      author_id: _id,
      author: user.username,
    });

    let push: AnyKeys<Module> = {};

    if (position === "end") {
      push = { cards: new_card._id };
    } else if (position === "start") {
      push = {
        cards: {
          $each: [new_card._id],
          $position: 0,
        },
      };
    }

    await moduleModel.updateOne(
      { _id: module._id, author_id: _id },
      { $push: push },
    );

    // Module numberSR shouldn't change as new cards start with studyRegime: false
    // But we'll update it anyway to ensure consistency
    await updateModuleNumberSR(module._id, _id);

    const { cards = [] } =
      (await moduleModel
        .findOne({ _id: module._id, author_id: _id })
        .populate<{ cards: Card[] }>({
          path: "cards",
        })) ?? {};

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

      let cards: Card[];
      let foundModule = await moduleModel.findOne({
        author_id: _id,
        draft: true,
      });

      const filterObj: FilterQuery<Card> = {
        author_id: _id,
      };

      if (foundModule) {
        filterObj.moduleID = foundModule._id;

        cards =
          (
            await moduleModel.populate<{ cards: Card[] }>(
              foundModule.toObject<Module>(),
              {
                path: "cards",
              },
            )
          )?.cards ?? [];
      } else {
        // Create a new draft
        foundModule = await moduleModel.create({
          title: "",
          author: user.username,
          author_id: _id,
          cards: [],
          creation_date: new Date(),
          draft: true,
          tags: [],
        });
        filterObj.moduleID = foundModule._id;

        const cardsData: CardBase[] = [];

        for (let i = 0; i < 5; i++) {
          cardsData.push({
            moduleID: new Types.ObjectId(foundModule._id),
            term: "",
            definition: "",
            imgurl: "",
            creation_date: new Date(Date.now() + i),
            studyRegime: false,
            stage: 1,
            nextRep: new Date(),
            prevStage: new Date(),
            lastRep: new Date(),
            author_id: _id,
            author: user.username,
          });
        }

        cards = await cardModel.create(cardsData);
        foundModule.cards = cards.map(card => new Types.ObjectId(card._id));
        await foundModule.save();
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

// @route ------ PUT api/edit/cards
// @desc ------- Edit multiple cards or create new ones
// @access ----- Private

type CardsEditReqBody = {
  moduleId: string;
  cards: Array<{
    _id?: string;
    term?: string;
    definition?: string;
    imgurl?: string;
  }>;
};

type CardsEditResBody = {
  cards: Card[];
};

type CardsEditReq = Request<any, any, CardsEditReqBody>;

type CardsEditRes = Response<CardsEditResBody | ResError>;

router.put("/cards", auth, async (req: CardsEditReq, res: CardsEditRes) => {
  try {
    const { moduleId, cards: cardsData } = req.body;

    const _id = res.locals.user._id;
    const username = res.locals.user.username;

    // Verify module exists and belongs to user
    const module = await moduleModel.findOne({
      _id: moduleId,
      author_id: _id,
    });

    if (!module) {
      throw new Error(`Module ${moduleId} not found or access denied`);
    }

    const oldCardsData = cardsData.filter(card => !!card._id);
    const newCardsData = cardsData.filter(card => !card._id);

    // Process each card
    for await (const cardData of oldCardsData) {
      // Update existing card
      const oldCard = await cardModel.findOne({
        _id: cardData._id,
        author_id: _id,
        moduleID: moduleId,
      });

      if (!oldCard) {
        newCardsData.push(cardData);
        continue;
      }

      if (cardData.term !== undefined) oldCard.term = cardData.term;
      if (cardData.definition !== undefined)
        oldCard.definition = cardData.definition;
      if (cardData.imgurl !== undefined) oldCard.imgurl = cardData.imgurl;

      await oldCard.save();
    }

    const newCards = await cardModel.create(
      newCardsData.map((cardData, i) => ({
        moduleID: moduleId,
        term: cardData.term || "",
        definition: cardData.definition || "",
        imgurl: cardData.imgurl || "",
        creation_date: new Date(Date.now() + i),
        studyRegime: false,
        stage: 1,
        nextRep: new Date(),
        prevStage: new Date(),
        lastRep: new Date(),
        author_id: _id,
        author: username,
      })),
    );

    await moduleModel.updateOne(
      { _id: moduleId, author_id: _id },
      {
        $push: {
          cards: {
            $each: newCards.map(card => new Types.ObjectId(card._id)),
            $position: 0,
          },
        },
      },
    );

    // Update numberSR after creating new cards
    await updateModuleNumberSR(new Types.ObjectId(moduleId), _id);

    // Return the updated cards in correct order
    const updatedCards =
      (
        await moduleModel
          .findOne({ _id: moduleId, author_id: _id })
          .populate<{ cards: Card[] }>({
            path: "cards",
          })
      )?.cards ?? [];

    res.status(200).json({ cards: updatedCards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// ----------------

export default router;
