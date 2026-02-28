import axiosInstance from "../../axiosInstance";

export const deleteEditModule = async (_id: string): Promise<void> => {
  await axiosInstance.delete<{ msg: string }>("edit/module", {
    params: { _id },
  });
};
