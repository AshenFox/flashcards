import axiosInstance from "../../axiosInstance";

export const editUpdateModule = async (
  module: Record<string, unknown>,
): Promise<void> => {
  await axiosInstance.put<{ msg: string }>("edit/module", module);
};
