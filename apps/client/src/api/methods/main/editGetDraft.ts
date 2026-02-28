import { GetEditDraftResponseDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const editGetDraft = async (): Promise<GetEditDraftResponseDto> => {
  const { data } = await axiosInstance.get<GetEditDraftResponseDto>(
    "edit/draft",
  );
  return data;
};
