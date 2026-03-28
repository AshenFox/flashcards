import {
  Card,
  ErrorResponse,
  filterRegex,
  GetMainCardsQuery,
  GetMainCardsResponse,
  GetMainModuleCardsQuery,
  GetMainModuleCardsResponse,
  GetMainModuleQuery,
  GetMainModuleResponse,
  GetMainModulesQuery,
  GetMainModulesResponse,
  Module,
} from "@flashcards/common";
import cardModel, { CardSortObj } from "@models/card_model";
import moduleModel, { ModuleSortObj } from "@models/module_model";
import { auth, query } from "@supplemental/middleware";
import { ResponseLocals } from "@supplemental/types";
import express, { Request } from "express";
import { FilterQuery } from "mongoose";

const router = express.Router();

// @route ------ GET api/main/modules
// @desc ------- Get user modules
// @access ----- Private

type ModulesGetReq = Request<any, any, any, GetMainModulesQuery>;

type ModulesGetRes = ResponseLocals<
  GetMainModulesResponse | ErrorResponse,
  GetMainModulesQuery
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

      if (typeof sr === "boolean")
        filterObj.numberSR = sr ? { $gt: 0 } : { $eq: 0 };

      const sortObj: ModuleSortObj = {};

      if (created === "newest") sortObj.creation_date = -1;
      if (created === "oldest") sortObj.creation_date = 1;

      if (search)
        filterObj.title = {
          $regex: filterRegex(search),
        };

      const modules = await moduleModel
        .find(filterObj)
        .populate("numberSR")
        .sort(sortObj)
        .skip(page * 10)
        .limit(10);

      const modules_number = await moduleModel.countDocuments(filterObj);

      const end = modules_number <= (page + 1) * 10;

      const result: GetMainModulesResponse = {
        draft: null,
        modules: {
          entries: modules,
          pagination: {
            page,
            number: modules_number,
            end,
            all,
          },
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

type CardsGetReq = Request<any, any, any, GetMainCardsQuery>;

type CardsGetRes = ResponseLocals<
  GetMainCardsResponse | ErrorResponse,
  GetMainCardsQuery
>;

router.get(
  "/cards",
  auth,
  query,
  async (req: CardsGetReq, res: CardsGetRes) => {
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

      if (sr === "in-highest") sortObj.stage = -1;
      if (sr === "in-lowest") sortObj.stage = 1;
      if (created === "newest") sortObj.creation_date = -1;
      if (created === "oldest") sortObj.creation_date = 1;

      const all = await cardModel.countDocuments(filterObj);

      if (search)
        filterObj[by] = {
          $regex: filterRegex(search),
        };

      if (sr === "in-lowest" || sr === "in-highest") {
        filterObj.studyRegime = true;
      } else if (sr === "out") {
        filterObj.studyRegime = false;
      }

      const cards = await cardModel
        .find(filterObj)
        .sort(sortObj)
        .skip(page * 10)
        .limit(10);

      const cards_number = await cardModel.countDocuments(filterObj);

      const end = cards_number <= (page + 1) * 10;

      res.status(200).json({
        entries: cards,
        pagination: { page, number: cards_number, end, all },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ GET api/main/module
// @desc ------- Get module (no cards)
// @access ----- Private

type GetMainModuleReq = Request<any, any, any, GetMainModuleQuery>;

type GetMainModuleRes = ResponseLocals<
  GetMainModuleResponse | ErrorResponse,
  GetMainModuleQuery
>;

router.get(
  "/module",
  auth,
  query,
  async (req: GetMainModuleReq, res: GetMainModuleRes) => {
    try {
      const { _id: module_id } = res.locals.query;

      const _id = res.locals.user._id;

      const foundModule = await moduleModel.findOne({
        _id: module_id,
        author_id: _id,
      });

      if (!foundModule)
        throw new Error(`Module ${module_id} has not been found.`);
      if (foundModule.draft) throw new Error("Can not get draft");

      res.status(200).json({
        module: foundModule,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

// @route ------ GET api/main/module/cards
// @desc ------- Get the module's cards (filter/sort; drafts allowed)
// @access ----- Private

type GetMainModuleCardsReq = Request<any, any, any, GetMainModuleCardsQuery>;

type GetMainModuleCardsRes = ResponseLocals<
  GetMainModuleCardsResponse | ErrorResponse,
  GetMainModuleCardsQuery
>;

router.get(
  "/module/cards",
  auth,
  query,
  async (req: GetMainModuleCardsReq, res: GetMainModuleCardsRes) => {
    try {
      const { _id: module_id, ...cardsQuery } = res.locals.query;

      const author_id = res.locals.user._id;

      const foundModule = await moduleModel.findOne({
        _id: module_id,
        author_id,
      });

      if (!foundModule)
        throw new Error(`Module ${module_id} has not been found.`);

      const {
        search,
        created = "newest",
        by = "term",
        sr,
      } = cardsQuery;

      const filterAll: FilterQuery<Card> = {
        moduleID: module_id,
        author_id,
      };

      const filterObj: FilterQuery<Card> = {
        moduleID: module_id,
        author_id,
      };

      const sortObj: CardSortObj = {};

      if (sr === "in-highest") sortObj.stage = -1;
      if (sr === "in-lowest") sortObj.stage = 1;
      if (created === "newest") sortObj.creation_date = -1;
      if (created === "oldest") sortObj.creation_date = 1;

      if (search)
        filterObj[by] = {
          $regex: filterRegex(search),
        };

      if (sr === "in-lowest" || sr === "in-highest") filterObj.studyRegime = true;
      else if (sr === "out") filterObj.studyRegime = false;


      const all = await cardModel.countDocuments(filterAll);
      const cards_number = await cardModel.countDocuments(filterObj);

      let cardQuery = cardModel.find(filterObj);
      if (Object.keys(sortObj).length > 0) cardQuery = cardQuery.sort(sortObj);
      const cards = await cardQuery;

      res.status(200).json({
        entries: cards,
        pagination: {
          page: 0,
          number: cards_number,
          end: true,
          all,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: "Server Error" });
    }
  },
);

export default router;
