import type { AuthResponse, LogInFormData } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const authLogIn = async (body: LogInFormData): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("auth/log_in", body);
  return data;
};
