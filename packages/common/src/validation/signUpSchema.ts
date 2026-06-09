import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, { error: "Please enter a username." })
    .regex(/^[A-Za-z0-9]+$/, {
      error: "Your username may only contain latin letters and numbers.",
    })
    .min(6, {
      error: "Your username is too short. The minimum length is 6 characters.",
    }),
  email: z
    .string()
    .min(1, { error: "Please enter an email." })
    .pipe(z.email({ error: "Invalid email format." })),
  password: z
    .string()
    .min(1, { error: "Please enter a password." })
    .regex(/^[A-Za-z0-9"!#$%&'()*+,.:;<=>?@\]^_`{}~"/\\-]+$/, {
      error:
        "Your password may only contain latin letters, numbers and special symbols.",
    })
    .min(8, {
      error: "Your password is too short. The minimum length is 8 characters.",
    })
    .regex(/[A-Z]/, {
      error: "Your password must have at least one uppercase letter.",
    }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
