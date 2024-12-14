import { JSONify } from "@common/types";
import { ResponseError } from "@server/types/methods";

export type ResponseErrorDto = JSONify<ResponseError>;
