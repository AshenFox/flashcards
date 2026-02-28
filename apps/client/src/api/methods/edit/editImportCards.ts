import { CardDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const editImportCards = async (
  moduleId: string,
  cards: unknown[],
): Promise<{ cards: CardDto[] }> => {
  const { data } = await axiosInstance.put<{ cards: CardDto[] }>(
    "edit/cards",
    { moduleId, cards },
  );
  return data;
};
