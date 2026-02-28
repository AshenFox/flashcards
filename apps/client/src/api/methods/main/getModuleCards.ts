import { GetMainModuleCardsResponseDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const getMainModuleCards = async (
  _id: string,
): Promise<GetMainModuleCardsResponseDto> => {
  const { data } = await axiosInstance.get<GetMainModuleCardsResponseDto>(
    "main/module/cards",
    { params: { _id } },
  );
  return data;
};
