import {
  GetMainCardsQueryDto,
  GetMainCardsResponseDto,
} from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const getMainCards = async (
  params: GetMainCardsQueryDto,
): Promise<GetMainCardsResponseDto> => {
  const { data } = await axiosInstance.get<GetMainCardsResponseDto>(
    "main/cards",
    { params },
  );
  return data;
};
