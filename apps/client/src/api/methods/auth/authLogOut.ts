import axiosInstance from "../../axiosInstance";

export const authLogOut = async (): Promise<void> => {
  await axiosInstance.post("auth/log_out");
};
