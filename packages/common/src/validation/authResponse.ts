export type AuthFieldErrors = Partial<
  Record<"username" | "email" | "password", string[]>
>;

export type AuthResponse = {
  token?: string;
  fieldErrors?: AuthFieldErrors;
};
