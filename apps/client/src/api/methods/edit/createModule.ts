import axiosInstance from "../../axiosInstance";

export const createEditModule = async (_id_arr: string[]): Promise<void> => {
  await axiosInstance.post<{ msg: string }>("edit/module", { _id_arr });
};
