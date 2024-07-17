import express, { Request, Response } from "express";

import { ResponseLocals } from "../@types/types";
import cardModel, { ICard, ICardSortObj } from "../models/card_model";
import moduleModel from "../models/module_model";
import userModel from "../models/user_model";
import middleware from "../supplemental/middleware";
import { IModule, IModuleSortObj } from "./../models/module_model";

const { auth } = middleware;
const router = express.Router();

interface IResError {
  errorBody: string;
}

// @route ------ GET api/main/modules
// @desc ------- Get user modules
// @access ----- Private

interface IModulesGetQuery extends qs.ParsedQs {
  skip: string;
  filter: string;
  created: "newest" | "oldest";
}

type TModulesGetReq = Request<any, any, any, IModulesGetQuery>;

interface IModulesGetResBody {
  draft: null | IModule;
  modules: IModule[];
  modules_number: number;
  all_modules: boolean;
  all_modules_number: number;
}

type TModulesGetRes = ResponseLocals<IModulesGetResBody | IResError>;

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

      const filterObj: {
        author_id: string;
        draft: boolean;
        title?: {
          $regex: string;
        };
      } = {
        author_id: _id,
        draft: false,
      };

      const sortObj: IModuleSortObj = {};

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

      const result: IModulesGetResBody = {
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

interface ICardsGetQuery extends qs.ParsedQs {
  skip: string;
  filter: string;
  by: "term" | "definition";
  created: "newest" | "oldest";
}

type TCardsGetReq = Request<any, any, any, ICardsGetQuery>;

interface ICardsGetResBody {
  cards: ICard[];
  cards_number: number;
  all_cards: boolean;
  all_cards_number: number;
}

type TCardsGetRes = ResponseLocals<ICardsGetResBody | IResError>;

router.get("/cards", auth, async (req: TCardsGetReq, res: TCardsGetRes) => {
  try {
    let { skip, filter, by, created } = req.query;

    const skipNum = parseInt(skip);

    const _id = res.locals.user._id;

    const draft = await moduleModel.findOne({
      author_id: _id,
      draft: true,
    });

    const filterObj: {
      author_id: string;
      moduleID?: { $ne: string };
      term?: { $regex: string };
      definition?: { $regex: string };
    } = {
      author_id: _id,
      moduleID: draft ? { $ne: draft._id } : undefined,
    };

    const sortObj: ICardSortObj = {};

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

interface IModuleGetQuery extends qs.ParsedQs {
  _id: string;
}

type TModuleGetReq = Request<any, any, any, IModuleGetQuery>;

interface IModuleGetResBody {
  module: IModule;
  cards: ICard[];
}

type TModuleGetRes = ResponseLocals<IModuleGetResBody | IResError>;

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

interface IModuleCardsGetQuery extends qs.ParsedQs {
  _id: string;
  filter: string;
  by: "term" | "definition";
}

type TModuleCardsGetReq = Request<any, any, any, IModuleCardsGetQuery>;

interface IModuleCardsGetResBody {
  cards: ICard[];
}

type TModuleCardsGetRes = ResponseLocals<IModuleCardsGetResBody | IResError>;

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

      const filterObj: {
        moduleID: string;
        author_id: string;
        term?: { $regex: string };
        definition?: { $regex: string };
      } = { moduleID: module_id, author_id: _id };

      const sortObj: ICardSortObj = { creation_date: 1 };

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
