import { IUser } from './../models/user_model';
import express, { Request, Response } from 'express';
import { check, ICheckResult } from '../supplemental/checks';
import userModel from '../models/user_model';
import jwt from 'jsonwebtoken';
import config from 'config';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import middleware from '../supplemental/middleware';

const { auth } = middleware;

const router = express.Router();

interface IResError {
  errorBody: string;
}

// @route ------ POST api/auth/check/:type
// @desc ------- Check form data of certain type
// @access ----- Public

interface ICheckPostParams {
  type: 'log_in' | 'sign_up';
}

type TCheckPostReq = Request<ICheckPostParams>;
type TCheckPostRes = Response<ICheckResult | IResError>;

router.post('/check/:type', async (req: TCheckPostReq, res: TCheckPostRes) => {
  try {
    const { type } = req.params;
    const errors = await check(req.body, type);
    res.status(200).json(errors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ POST api/auth/entry/:type
// @desc ------- Entry a user
// @access ----- Public

interface IEntryPostParams {
  type: 'log_in' | 'sign_up';
}

interface IEntryPostReqBody {
  username: string;
  email: string;
  password: string;
}

type TEntryPostReq = Request<IEntryPostParams, any, IEntryPostReqBody>;

interface IEntryPostResBody {
  errors: ICheckResult;
  token?: string;
}

type TEntryPostRes = Response<IEntryPostResBody | IResError>;

router.post('/entry/:type', async (req: TEntryPostReq, res: TEntryPostRes) => {
  try {
    const { type } = req.params;

    const errors = await check(req.body, type);

    const { username, email, password } = req.body;

    const res_data: IEntryPostResBody = { errors };

    if (errors.ok) {
      let user: IUser | null = null;

      if (type === 'log_in') {
        user = await userModel.findOne({
          username,
        });
      } else if (type === 'sign_up') {
        const user_data = {
          server_id: uuidv4(),
          username,
          email,
          registration_date: new Date(),
          password: '',
        };

        user_data.password = await bcrypt.hash(password, 10);

        user = await userModel.create(user_data);

        console.log('A new user has been signed up!');
      }

      if (!user) throw new Error('The user has not been found.');

      const id = user.server_id;

      const token = await jwt.sign({ id }, config.get('jwtSecret'));

      res_data.token = token;

      console.log(`A user has logged in!`);
    }

    res.status(200).json(res_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/auth
// @desc ------- Authenticate
// @access ----- Private

type TAuthGetRes = Response<IUser | IResError | null>;

router.get('/', auth, async (req: Request, res: TAuthGetRes) => {
  try {
    const { server_id } = req.user || {};

    const user = await userModel.findOne({
      server_id,
    });

    if (user) user.password = '';

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

export default router;
