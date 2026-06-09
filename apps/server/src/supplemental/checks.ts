import {
  type AuthFieldErrors,
  type LogInFormData,
  logInSchema,
  type SignUpFormData,
  signUpSchema,
} from "@flashcards/common";
import userModel from "@models/user_model";
import bcrypt from "bcryptjs";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; fieldErrors: AuthFieldErrors };

const userExists = async (str: string) => {
  try {
    const user = await userModel.findOne({ username: str });
    return !!user;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const emailTaken = async (str: string) => {
  try {
    const user = await userModel.findOne({ email: str });
    return !!user;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const noUser = async (str: string) => {
  try {
    const user = await userModel.findOne({ username: str });
    return !user;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const incorrectPassword = async (username: string, password: string) => {
  try {
    const user = await userModel.findOne({ username });

    if (!user) return true;

    return !(await bcrypt.compare(password, user.password));
  } catch (err) {
    console.log(err);
    return true;
  }
};

const signUpValidator = signUpSchema.superRefine(async (data, ctx) => {
  const [usernameTaken, emailTakenResult] = await Promise.all([
    userExists(data.username),
    emailTaken(data.email),
  ]);

  if (usernameTaken) {
    ctx.addIssue({
      code: "custom",
      path: ["username"],
      message: "Username taken.",
    });
  }

  if (emailTakenResult) {
    ctx.addIssue({
      code: "custom",
      path: ["email"],
      message: "This email has already been taken.",
    });
  }
});

const logInValidator = logInSchema.superRefine(async (data, ctx) => {
  if (await noUser(data.username)) {
    ctx.addIssue({
      code: "custom",
      path: ["username"],
      message: `Username "${data.username}" does not exist`,
    });
    return;
  }

  if (await incorrectPassword(data.username, data.password)) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "The password you entered is incorrect. Try again...",
    });
  }
});

type ZodLikeError = {
  issues: ReadonlyArray<{
    path: ReadonlyArray<PropertyKey>;
    message: string;
  }>;
};

const toFieldErrors = (error: ZodLikeError): AuthFieldErrors => {
  const fieldErrors: AuthFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field !== "string") continue;

    const key = field as keyof AuthFieldErrors;
    fieldErrors[key] ??= [];
    fieldErrors[key]!.push(issue.message);
  }

  return fieldErrors;
};

export const validateSignUp = async (
  data: unknown,
): Promise<ValidationResult<SignUpFormData>> => {
  const result = await signUpValidator.safeParseAsync(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, fieldErrors: toFieldErrors(result.error) };
};

export const validateLogIn = async (
  data: unknown,
): Promise<ValidationResult<LogInFormData>> => {
  const result = await logInValidator.safeParseAsync(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, fieldErrors: toFieldErrors(result.error) };
};
