import { CardDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const editDeleteCard = async (
  _id: string,
): Promise<{ msg: string; cards: CardDto[] }> => {
  const { data } = await axiosInstance.delete<{ msg: string; cards: CardDto[] }>(
    "edit/card",
    { params: { _id } },
  );
  return data;
};
