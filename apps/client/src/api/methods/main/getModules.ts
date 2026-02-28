import {
  GetMainModulesQueryDto,
  GetMainModulesResponseDto,
} from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const mainGetModules = async (
  params: GetMainModulesQueryDto,
): Promise<GetMainModulesResponseDto> => {
  const { data } = await axiosInstance.get<GetMainModulesResponseDto>(
    "main/modules",
    { params },
  );
  return data;
};
