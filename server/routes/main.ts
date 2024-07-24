import express, { Request } from "express";
import { FilterQuery } from "mongoose";

import { ResponseLocals } from "../@types/types";
import cardModel, { Card, CardSortObj } from "../models/card_model";
import moduleModel from "../models/module_model";
import userModel from "../models/user_model";
import middleware from "../supplemental/middleware";
import { Module, ModuleSortObj } from "./../models/module_model";

const { auth } = middleware;
const router = express.Router();

interface IResError {
  errorBody: string;
}

// @route ------ GET api/main/modules
// @desc ------- Get user modules
// @access ----- Private

interface ModulesGetQuery extends qs.ParsedQs {
  skip: string;
  filter: string;
  created: "newest" | "oldest";
}

type TModulesGetReq = Request<any, any, any, ModulesGetQuery>;

interface ModulesGetResBody {
  draft: null | Module;
  modules: Module[];
  modules_number: number;
  all_modules: boolean;
  all_modules_number: number;
}

type TModulesGetRes = ResponseLocals<ModulesGetResBody | IResError>;

router.get(
  "/modules",
  auth,
  async (req: TModulesGetReq, res: TModulesGetRes) => {
    try {
      const { skip, filter, created } = req.query;

      const skipNum = parseInt(skip);

      const _id = res.locals.user._id;

      const draft = await moduleModel.findOne({
        author_id: _id,
        draft: true,
      });

      let all_modules_number = await moduleModel.countDocuments({
        author_id: _id,
      });

      const filterObj: FilterQuery<Module> = {
        author_id: _id,
        draft: false,
      };

      const sortObj: ModuleSortObj = {};

      if (created === "newest") sortObj.creation_date = -1;
      if (created === "oldest") sortObj.creation_date = 1;

      if (filter)
        filterObj.title = {
          $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
        };

      const modules = await moduleModel
        .find(filterObj)
        .sort(sortObj)
        .skip(skipNum * 10)
        .limit(10);

      const modules_number = await moduleModel.countDocuments(filterObj);

      if (draft) --all_modules_number;

      const all_modules = all_modules_number <= (skipNum + 1) * 10;

      const result: ModulesGetResBody = {
        draft: null,
        modules,
        modules_number,
        all_modules,
        all_modules_number,
      };

      if (!filter) result.draft = draft;

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

interface CardsGetQuery extends qs.ParsedQs {
  skip: string;
  filter: string;
  by: "term" | "definition";
  created: "newest" | "oldest";
}

type TCardsGetReq = Request<any, any, any, CardsGetQuery>;

interface CardsGetResBody {
  cards: Card[];
  cards_number: number;
  all_cards: boolean;
  all_cards_number: number;
}

type TCardsGetRes = ResponseLocals<CardsGetResBody | IResError>;

router.get("/cards", auth, async (req: TCardsGetReq, res: TCardsGetRes) => {
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

interface ModuleGetQuery extends qs.ParsedQs {
  _id: string;
}

type TModuleGetReq = Request<any, any, any, ModuleGetQuery>;

interface ModuleGetResBody {
  module: Module;
  cards: Card[];
}

type TModuleGetRes = ResponseLocals<ModuleGetResBody | IResError>;

router.get("/module", auth, async (req: TModuleGetReq, res: TModuleGetRes) => {
  try {
    let { _id: module_id } = req.query;

    const _id = res.locals.user._id;

    const user = await userModel.findOne({
      _id,
    });

    if (!user) throw new Error(`User ${_id} has not been found.`);

    /* eslint-disable */
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

interface ModuleCardsGetQuery extends qs.ParsedQs {
  _id: string;
  filter: string;
  by: "term" | "definition";
}

type TModuleCardsGetReq = Request<any, any, any, ModuleCardsGetQuery>;

interface ModuleCardsGetResBody {
  cards: Card[];
}

type TModuleCardsGetRes = ResponseLocals<ModuleCardsGetResBody | IResError>;

router.get(
  "/module/cards",
  auth,
  async (req: TModuleCardsGetReq, res: TModuleCardsGetRes) => {
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
