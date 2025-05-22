import { DateJSON, DefaultOptions, ObjectIdJSON } from "@common/types";

export type CategoryCreator<Options extends DefaultOptions> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  name: string;
  description: string;
  user_id: ObjectIdJSON<Options["isJson"]>;
  creation_date: DateJSON<Options["isJson"]>;
  color: string;
};

// server types
export type Category = CategoryCreator<{ isJson: false }>;
export type CategoryBase = Omit<Category, "_id">;

// api types
export type CategoryDto = CategoryCreator<{ isJson: true }>;
export type CategoryBaseDto = Omit<CategoryDto, "_id">;

// Reference type for embedding in other models
export type CategoryReferenceCreator<Options extends DefaultOptions> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  name: string;
};

export type CategoryReference = CategoryReferenceCreator<{ isJson: false }>;
export type CategoryReferenceDto = CategoryReferenceCreator<{ isJson: true }>;
