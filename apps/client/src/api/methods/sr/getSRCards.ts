import { CardDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const getSRCards = async (
  number: number,
): Promise<{ cards: CardDto[] }> => {
  const { data } = await axiosInstance.get<{ cards: CardDto[] }>("sr/cards", {
    params: { number },
  });
  return data;
};
