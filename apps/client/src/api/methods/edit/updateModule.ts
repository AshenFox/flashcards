import axiosInstance from "../../axiosInstance";

export const updateEditModule = async (
  module: Record<string, unknown>,
): Promise<void> => {
  await axiosInstance.put<{ msg: string }>("edit/module", module);
};
