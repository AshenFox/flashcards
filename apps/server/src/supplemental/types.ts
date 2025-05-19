import { User } from "@flashcards/common";
import { Response } from "express";
import { Document, Types } from "mongoose";

export type UserDocument = Document<unknown, unknown, User> &
  Omit<
    User &
      Required<{
        _id: Types.ObjectId;
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
