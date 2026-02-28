import axiosInstance from "../../axiosInstance";

export const checkAuthSignUp = async <T>(
  body: Record<string, unknown>,
): Promise<T> => {
  const { data } = await axiosInstance.post<T>("auth/check/sign_up", body);
  return data;
};
