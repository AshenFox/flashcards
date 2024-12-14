import { JSONify } from "@common/types";
import { User } from "@server/types/entities";

export type UserDto = JSONify<User>;
