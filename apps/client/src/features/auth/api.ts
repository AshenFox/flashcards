import axiosInstance from "@api/axiosInstance";
import type { AuthResponse, LogInFormData, SignUpFormData } from "@flashcards/common";

export const authLogIn = async (body: LogInFormData): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("auth/log_in", body);
  return data;
};

export const authLogOut = async (): Promise<void> => {
  await axiosInstance.post("auth/log_out");
};

export const authSignUp = async (body: SignUpFormData): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("auth/sign_up", body);
  return data;
};

