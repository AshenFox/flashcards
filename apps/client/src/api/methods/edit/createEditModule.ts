import axiosInstance from "../../axiosInstance";

export const editCreateModule = async (_id_arr: string[]): Promise<void> => {
  await axiosInstance.post<{ msg: string }>("edit/module", { _id_arr });
};
