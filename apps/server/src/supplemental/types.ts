import { User } from "@serverTypes/entities";
import { Response } from "express";
import { Document } from "mongoose";

export type UserDocument = Document<unknown, unknown, User> &
  Omit<
    User &
      Required<{
        _id: string;
      }>,
    never
  >;

export type Locals<Query = unknown> = object & {
  user: UserDocument;
  query: Query;
};

export type ResponseLocals<ResBody = unknown, Query = unknown> = Response<
  ResBody,
  Locals<Query>
>;
