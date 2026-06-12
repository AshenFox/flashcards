import { z } from "zod";

export const logInSchema = z.object({
  username: z.string().min(1, { error: "Please enter a username." }),
  password: z.string().min(1, { error: "Please enter a password." }),
});

export type LogInFormData = z.infer<typeof logInSchema>;
