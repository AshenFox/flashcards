import axiosInstance from "../../axiosInstance";

export type AuthEntryResponse<T> = {
  token: string;
  errors: T;
};

export const authEntry = async <T>(
  type: "log_in" | "sign_up",
  body: Record<string, unknown>,
): Promise<AuthEntryResponse<T>> => {
  const { data } = await axiosInstance.post<AuthEntryResponse<T>>(
    `auth/entry/${type}`,
    body,
  );
  return data;
};
