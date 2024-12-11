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

export type Locals<Query = any> = object & {
  user: UserDocument;
  query: Query;
};

export type ResponseLocals<ResBody = any, Query = any> = Response<
  ResBody,
  Locals<Query>
>;
