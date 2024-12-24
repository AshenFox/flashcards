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
  CardsGetQuery,
  CardsGetResponse,
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
        sr,
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

      if (typeof sr === "boolean") {
        filterObj.numberSR = sr ? { $gt: 0 } : { $eq: 0 };
      }

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

      const end = modules_number <= (page + 1) * 10;

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

type CardsGetReq = Request<any, any, any, CardsGetQuery>;

type CardsGetRes = ResponseLocals<
  CardsGetResponse | ErrorResponse,
  CardsGetQuery
>;

router.get("/cards", auth, async (req: CardsGetReq, res: CardsGetRes) => {
  try {
    const {
      page = 0,
      search,
      created = "newest",
      by = "term",
      sr,
    } = res.locals.query;

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

    const all = await cardModel.countDocuments(filterObj);

    if (search)
      filterObj[by] = {
        $regex: `${search}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
      };

    const cards = await cardModel
      .find(filterObj)
      .sort(sortObj)
      .skip(page * 10)
      .limit(10);

    const cards_number = await cardModel.countDocuments(filterObj);

    const end = cards_number <= (page + 1) * 10;

    res
      .status(200)
      .json({ page, entries: cards, number: cards_number, end, all });
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
