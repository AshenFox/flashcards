import { IModule, IModuleSortObj } from './../models/module_model';
import express, { Request, Response } from 'express';
import userModel from '../models/user_model';
import cardModelGenerator, { ICard, ICardSortObj } from '../models/card_model';
import moduleModelGenerator from '../models/module_model';
import middleware from '../supplemental/middleware';

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
  created: 'newest' | 'oldest';
}

type TModulesGetReq = Request<any, any, any, IModulesGetQuery>;

interface IModulesGetResBody {
  draft: null | IModule;
  modules: IModule[];
  modules_number: number;
  all_modules: boolean;
  all_modules_number: number;
}

type TModulesGetRes = Response<IModulesGetResBody | IResError>;

router.get('/modules', auth, async (req: TModulesGetReq, res: TModulesGetRes) => {
  try {
    const { skip, filter, created } = req.query;

    const skipNum = parseInt(skip);

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const moduleModel = moduleModelGenerator(user.username);

    const draft = await moduleModel.findOne({
      draft: true,
    });

    let all_modules_number = await moduleModel.estimatedDocumentCount();

    const filterObj: {
      draft: boolean;
      title?: {
        $regex: string;
      };
    } = {
      draft: false,
    };

    const sortObj: IModuleSortObj = {};

    if (created === 'newest') sortObj.creation_date = -1;
    if (created === 'oldest') sortObj.creation_date = 1;

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
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/main/cards
// @desc ------- Get user cards
// @access ----- Private

interface ICardsGetQuery extends qs.ParsedQs {
  skip: string;
  filter: string;
  by: 'term' | 'definition';
  created: 'newest' | 'oldest';
}

type TCardsGetReq = Request<any, any, any, ICardsGetQuery>;

interface ICardsGetResBody {
  cards: ICard[];
  cards_number: number;
  all_cards: boolean;
  all_cards_number: number;
}

type TCardsGetRes = Response<ICardsGetResBody | IResError>;

router.get('/cards', auth, async (req: TCardsGetReq, res: TCardsGetRes) => {
  try {
    let { skip, filter, by, created } = req.query;

    const skipNum = parseInt(skip);

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    const draft = await moduleModel.findOne({
      draft: true,
    });

    const filterObj: {
      moduleID?: { $ne: string };
      term?: { $regex: string };
      definition?: { $regex: string };
    } = draft ? { moduleID: { $ne: draft._id } } : {};

    const sortObj: ICardSortObj = {};

    if (created === 'newest') sortObj.creation_date = -1;
    if (created === 'oldest') sortObj.creation_date = 1;

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
    res.status(500).json({ errorBody: 'Server Error' });
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

type TModuleGetRes = Response<IModuleGetResBody | IResError>;

router.get('/module', auth, async (req: TModuleGetReq, res: TModuleGetRes) => {
  try {
    let { _id } = req.query;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (!user) throw new Error(`User ${server_id} has not been found.`);

    const cardModel = cardModelGenerator(user.username);
    const moduleModel = moduleModelGenerator(user.username);

    /* eslint-disable */
    const module = await moduleModel.findOne({
      _id,
    });

    if (!module) throw new Error(`Module ${_id} has not been found.`);
    if (module.draft) throw new Error('Can not get draft');

    const cards = await cardModel.find({ moduleID: _id }).sort({ creation_date: 1 });

    res.status(200).json({ module, cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/main/module/cards
// @desc ------- Get only the module's cards
// @access ----- Private

interface IModuleCardsGetQuery extends qs.ParsedQs {
  _id: string;
  filter: string;
  by: 'term' | 'definition';
}

type TModuleCardsGetReq = Request<any, any, any, IModuleCardsGetQuery>;

interface IModuleCardsGetResBody {
  cards: ICard[];
}

type TModuleCardsGetRes = Response<IModuleCardsGetResBody | IResError>;

router.get(
  '/module/cards',
  auth,
  async (req: TModuleCardsGetReq, res: TModuleCardsGetRes) => {
    try {
      let { _id, filter, by } = req.query;

      const server_id = req.user.server_id;

      const user = await userModel.findOne({
        server_id,
      });

      if (!user) throw new Error(`User ${server_id} has not been found.`);

      const cardModel = cardModelGenerator(user.username);

      const filterObj: {
        moduleID: string;
        term?: { $regex: string };
        definition?: { $regex: string };
      } = { moduleID: _id };

      const sortObj: ICardSortObj = { creation_date: 1 };

      if (filter)
        filterObj[by] = {
          $regex: `${filter}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`,
        };

      const cards = await cardModel.find(filterObj).sort(sortObj);

      res.status(200).json({ cards });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorBody: 'Server Error' });
    }
  }
);

export default router;
