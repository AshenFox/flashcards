import { CardDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const editCreateCard = async (
  module: Record<string, unknown>,
  position: "start" | "end",
): Promise<{ cards: CardDto[] }> => {
  const { data } = await axiosInstance.post<{ cards: CardDto[] }>(
    "edit/card",
    { module, position },
  );
  return data;
};
