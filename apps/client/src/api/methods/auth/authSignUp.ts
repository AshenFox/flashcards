import type { AuthResponse, SignUpFormData } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const authSignUp = async (body: SignUpFormData): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("auth/sign_up", body);
  return data;
};
