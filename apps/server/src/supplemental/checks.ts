import userModel from "@models/user_model";
import bcrypt from "bcryptjs";

const minLength = (str: string, length: number) => str.length <= length;

const invalidChar = (str: string, allowed: RegExp) => {
  let result = false;

  let arr = [...str];

  for (let i = 0; i < arr.length; i++) {
    if (!allowed.test(arr[i])) {
      result = true;
    }
  }

  return result;
};

const userExists = async (str: string) => {
  let result = false;

  try {
    let user = await userModel.findOne({
      username: str,
    });

    if (user) result = true;
  } catch (err) {
    console.log(err);
  }

  return result;
};

const emailFormat = (str: string) => !emailRegExp.test(str);

const emailTaken = async (str: string) => {
  let result = false;

  try {
    let user = await userModel.findOne({
      email: str,
    });

    if (user) result = true;
  } catch (err) {
    console.log(err);
  }

  return result;
};

const oneUppercase = (str: string) => allCapitalRegExp.test(str);

const noUser = async (str: string) => {
  let result = false;

  try {
    let user = await userModel.findOne({
      username: str,
    });

    if (!user) result = true;
  } catch (err) {
    console.log(err);
  }

  return result;
};

const incorrectPassword = async (username: string, password: string) => {
  let result = false;

  try {
    let user = await userModel.findOne({
      username: username,
    });

    if (!user) {
      result = true;
      throw new Error("User is not found");
    }

    if (!(await bcrypt.compare(password, user.password))) result = true;
  } catch (err) {
    console.log(err);
  }

  return result;
};

const isEmpty = (str: string) => !str;

const userRegExp = /[A-z0-9]/;
const passRegExp = /[A-z0-9"!#$%&'()*+,.:;<=>?@\]^_`{}~"/\\-]/;
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
const allCapitalRegExp = /[A-Z]/;

type CheckData = {
  username: string;
  password: string;
  email: string;
};

type Field = {
  ok: boolean;
  errors: string[];
};

export type CheckResult = {
  ok: boolean;
  username?: Field;
  password?: Field;
  email?: Field;
};

export const check = async (data: CheckData, type: "log_in" | "sign_up") => {
  const { username, password, email } = data;

  let result: CheckResult = { ok: true };

  // Username checks
  if (typeof username !== "undefined") {
    const errors: string[] = [];
    const length = 5;

    if (isEmpty(username)) errors.push("Please enter a username.");
    if (invalidChar(username, userRegExp))
      errors.push("Your username may only contain latin letters and numbers.");

    // type === log_in
    if (type === "log_in") {
      if (await noUser(username))
        errors.push(`Username "${username}" does not exist`);
    }
    // ----------

    // type === sign_up
    if (type === "sign_up") {
      if (minLength(username, length))
        errors.push(
          `Your username is too short. The minimum length is ${length} characters.`,
        );
      if (await userExists(username)) errors.push("Username taken.");
    }
    // ----------
    result.username = {
      ok: !errors.length,
      errors,
    };

    if (errors.length) result.ok = false;
  }

  // Password checks
  if (typeof password !== "undefined") {
    const errors: string[] = [];
    const length = 7;

    if (isEmpty(password)) errors.push("Please enter a password.");
    if (invalidChar(password, passRegExp))
      errors.push(
        "Your password may only contain latin letters, numbers and special symbols.",
      );
    // type === log_in
    if (type === "log_in") {
      if (await incorrectPassword(username, password))
        errors.push("The password you entered is incorrect. Try again...");
    }
    // ----------
    // type === sign_up
    if (type === "sign_up") {
      if (minLength(password, length))
        errors.push(
          `Your password is too short. The minimum length is ${length} characters.`,
        );
      if (!oneUppercase(password))
        errors.push("Your password must have at least one uppercase letter.");
    }
    // ----------

    result.password = {
      ok: !errors.length,
      errors,
    };

    if (errors.length) result.ok = false;
  }

  // Email checks
  if (typeof email !== "undefined") {
    const errors: string[] = [];

    if (isEmpty(email)) errors.push("Please enter an email.");
    if (emailFormat(email)) errors.push("Invalid email format.");
    if (await emailTaken(email))
      errors.push("This email has already been taken.");

    result.email = {
      ok: !errors.length,
      errors,
    };

    if (errors.length) result.ok = false;
  }

  if (Object.keys(result).length < 3) result.ok = false;

  return result;
};
