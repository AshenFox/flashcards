import { Response } from "express";
import { Document } from "mongoose";

import { IUser } from "../models/user_model";

export type UserDocument = Document<unknown, any, IUser> &
  Omit<
    IUser &
      Required<{
        _id: string;
      }>,
    never
  >;

export type Locals = object & {
  user: UserDocument;
};

export type ResponseLocals<ResBody = any> = Response<ResBody, Locals>;
