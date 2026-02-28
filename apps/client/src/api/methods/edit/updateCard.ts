import axiosInstance from "../../axiosInstance";

export const updateEditCard = async (
  card: Record<string, unknown>,
): Promise<void> => {
  await axiosInstance.put<{ msg: string }>("edit/card", card);
};
