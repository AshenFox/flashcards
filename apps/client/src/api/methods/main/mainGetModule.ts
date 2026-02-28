import {
  GetMainModuleQueryDto,
  GetMainModuleResponseDto,
} from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const mainGetModule = async (
  params: GetMainModuleQueryDto,
): Promise<GetMainModuleResponseDto> => {
  const { data } = await axiosInstance.get<GetMainModuleResponseDto>(
    "main/module",
    { params },
  );
  return data;
};
