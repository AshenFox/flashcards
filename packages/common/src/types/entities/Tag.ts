import { DefaultOptions, ObjectIdJSON } from "@common/types";

export type TagCreator<Options extends DefaultOptions> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  name: string;
  user_id: ObjectIdJSON<Options["isJson"]>;
};

// server types
export type Tag = TagCreator<{ isJson: false }>;
export type TagBase = Omit<Tag, "_id">;

// api types
export type TagDto = TagCreator<{ isJson: true }>;
export type TagBaseDto = Omit<TagDto, "_id">;

// Reference type for embedding in other models
export type TagReferenceCreator<Options extends DefaultOptions> = {
  _id: ObjectIdJSON<Options["isJson"]>;
  name: string;
};

export type TagReference = TagReferenceCreator<{ isJson: false }>;
export type TagReferenceDto = TagReferenceCreator<{ isJson: true }>;
