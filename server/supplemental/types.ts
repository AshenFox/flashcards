import { User } from "@common/types";
import { Response } from "express";
import { Document } from "mongoose";

export type UserDocument = Document<unknown, any, User> &
  Omit<
    User &
      Required<{
        _id: string;
      }>,
    never
  >;

export type Locals = object & {
  user: UserDocument;
};

export type ResponseLocals<ResBody = any> = Response<ResBody, Locals>;
