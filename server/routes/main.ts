import cardModel, { CardSortObj } from "@models/card_model";
import moduleModel from "@models/module_model";
import { ModuleSortObj } from "@models/module_model";
import userModel from "@models/user_model";
import { auth, query } from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import express, { Request } from "express";
import { FilterQuery } from "mongoose";
import { Card, Module } from "types/entities";
import {
  ErrorResponse,
  ModulesGetQuery,
  ModulesGetResponse,
} from "types/methods";

const router = express.Router();

// @route ------ GET api/main/modules
// @desc ------- Get user modules
// @access ----- Private

type ModulesGetReq = Request<any, any, any, ModulesGetQuery>;

type ModulesGetRes = ResponseLocals<
  ModulesGetResponse | ErrorResponse,
  ModulesGetQuery
>;

router.get(
  "/modules",
  auth,
  query,
  async (req: ModulesGetReq, res: ModulesGetRes) => {
    try {
      const {
        page = 0,
        search,
        created = "newest",
        draft = true,
        sr = false,
      } = res.locals.query;

      const _id = res.locals.user._id;

      const draftModule = draft
        ? await moduleModel.findOne({
            author_id: _id,
            draft: true,
          })
        : null;

      let all = await moduleModel.countDocuments({
        author_id: _id,
        draft: false,
      });

      const filterObj: FilterQuery<Module> = {
        author_id: _id,
        draft: false,
      };

      if (sr) filterObj.numberSR = { $gt: 0 };

      const sortObj: ModuleSortObj = {};

      if (created === "newest") sortObj.creation_date = -1;
      if (created === "oldest") sortObj.creation_date = 1;

      if (search)
        filterObj.title = {
          $regex: `${search}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
        };

      const modules = await moduleModel
        .find(filterObj)
        .sort(sortObj)
        .skip(page * 10)
        .limit(10);

      const modules_number = await moduleModel.countDocuments(filterObj);

      const end = all <= (page + 1) * 10;

      const result: ModulesGetResponse = {
        draft: null,
        modules: {
          page,
          entries: modules,
          number: modules_number,
          end,
          all,
        },
      };

      if (draft) result.draft = draftModule;

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ GET api/main/cards
// @desc ------- Get user cards
// @access ----- Private

type CardsGetQuery = qs.ParsedQs & {
  skip: string;
  filter: string;
  by: "term" | "definition";
  created: "newest" | "oldest";
};

type CardsGetReq = Request<any, any, any, CardsGetQuery>;

type CardsGetResBody = {
  cards: Card[];
  cards_number: number;
  all_cards: boolean;
  all_cards_number: number;
};

type CardsGetRes = ResponseLocals<CardsGetResBody | ErrorResponse>;

router.get("/cards", auth, async (req: CardsGetReq, res: CardsGetRes) => {
  try {
    let { skip, filter, by, created } = req.query;

    const skipNum = parseInt(skip);

    const _id = res.locals.user._id;

    const draft = await moduleModel.findOne({
      author_id: _id,
      draft: true,
    });

    const filterObj: FilterQuery<Card> = {
      author_id: _id,
    };

    if (draft) filterObj.moduleID = { $ne: draft._id };

    const sortObj: CardSortObj = {};

    if (created === "newest") sortObj.creation_date = -1;
    if (created === "oldest") sortObj.creation_date = 1;

    const all_cards_number = await cardModel.countDocuments(filterObj);

    if (filter)
      filterObj[by] = {
        $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
      };

    const cards = await cardModel
      .find(filterObj)
      .sort(sortObj)
      .skip(skipNum * 10)
      .limit(10);

    const cards_number = await cardModel.countDocuments(filterObj);

    const all_cards = cards_number <= (skipNum + 1) * 10;

    res.status(200).json({ cards, cards_number, all_cards, all_cards_number });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ GET api/main/module
// @desc ------- Get module with cards
// @access ----- Private

type ModuleGetQuery = qs.ParsedQs & {
  _id: string;
};

type ModuleGetReq = Request<any, any, any, ModuleGetQuery>;

type ModuleGetResBody = {
  module: Module;
  cards: Card[];
};

type ModuleGetRes = ResponseLocals<ModuleGetResBody | ErrorResponse>;

router.get("/module", auth, async (req: ModuleGetReq, res: ModuleGetRes) => {
  try {
    let { _id: module_id } = req.query;

    const _id = res.locals.user._id;

    const user = await userModel.findOne({
      _id,
    });

    if (!user) throw new Error(`User ${_id} has not been found.`);

    const foundModule = await moduleModel.findOne({
      _id: module_id,
      author_id: _id,
    });

    if (!foundModule) throw new Error(`Module ${_id} has not been found.`);
    if (foundModule.draft) throw new Error("Can not get draft");

    const cards = await cardModel
      .find({ moduleID: module_id, author_id: _id })
      .sort({ creation_date: 1 });

    res.status(200).json({ module: foundModule, cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ GET api/main/module/cards
// @desc ------- Get only the module's cards
// @access ----- Private

type ModuleCardsGetQuery = qs.ParsedQs & {
  _id: string;
  filter: string;
  by: "term" | "definition";
};

type ModuleCardsGetReq = Request<any, any, any, ModuleCardsGetQuery>;

type ModuleCardsGetResBody = {
  cards: Card[];
};

type ModuleCardsGetRes = ResponseLocals<ModuleCardsGetResBody | ErrorResponse>;

router.get(
  "/module/cards",
  auth,
  async (req: ModuleCardsGetReq, res: ModuleCardsGetRes) => {
    try {
      let { _id: module_id, filter, by } = req.query;

      const _id = res.locals.user._id;

      const user = await userModel.findOne({
        _id,
      });

      if (!user) throw new Error(`User ${_id} has not been found.`);

      const filterObj: FilterQuery<Card> = {
        moduleID: module_id,
        author_id: _id,
      };

      const sortObj: CardSortObj = { creation_date: 1 };

      if (filter)
        filterObj[by] = {
          $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
        };

      const cards = await cardModel.find(filterObj).sort(sortObj);

      res.status(200).json({ cards });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

export default router;
