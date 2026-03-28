import {
  GetMainModuleCardsQueryDto,
  GetMainModuleCardsResponseDto,
} from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const mainGetModuleCards = async (
  params: GetMainModuleCardsQueryDto,
): Promise<GetMainModuleCardsResponseDto> => {
  const { data } = await axiosInstance.get<GetMainModuleCardsResponseDto>(
    "main/module/cards",
    { params },
  );
  return data;
};
