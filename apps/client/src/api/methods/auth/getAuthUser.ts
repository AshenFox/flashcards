import { UserDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const getAuthUser = async (): Promise<UserDto> => {
  const { data } = await axiosInstance.get<UserDto>("auth");
  return data;
};
