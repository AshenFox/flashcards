// const uuidv4 = require('uuid/v4');
const userModel = require('../models/user_model.js');
const bcrypt = require('bcryptjs');

const minLength = (str, length) => {
  let result = false;

  if (str.length <= length) {
    result = true;
  }

  return result;
};

const invalidChar = (str, allowed) => {
  let result = false;

  let arr = [...str];

  for (let i = 0; i < arr.length; i++) {
    if (!allowed.test(arr[i])) {
      result = true;
    }
  }

  return result;
};

const userExists = async (str) => {
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

const emailFormat = (str) => {
  let result = !emailRegExp.test(str);

  return result;
};

const emailTaken = async (str) => {
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

const oneUppercase = (str) => {
  return allCapitalRegExp.test(str);
};

const noUser = async (str) => {
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

const incorrectPassword = async (username, password) => {
  let result = false;
  try {
    let user = await userModel.findOne({
      username: username,
    });

    if (!user) {
      result = true;
      throw new Error('User is not found');
    }

    if (!(await bcrypt.compare(password, user.password))) result = true;
  } catch (err) {
    console.log(err);
  }

  return result;
};

const isEmpty = (str) => {
  if (!str) return true;
  return false;
};

const userRegExp = /[A-z0-9]/;
const passRegExp = /[A-z0-9"!#$%&'()*+,.:;<=>?@\]\[^_`{}~"\/\\\-]/;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const allCapitalRegExp = /[A-Z]/;

const check = async (data, type) => {
  const { username, password, email } = data;

  let result = { ok: true };

  // Username checks
  if (typeof username !== 'undefined') {
    const errors = [];
    const length = 5;

    if (isEmpty(username)) errors.push('Please enter a username.');
    if (invalidChar(username, userRegExp))
      errors.push('Your username may only contain latin letters and numbers.');

    // type === log_in
    if (type === 'log_in') {
      if (await noUser(username))
        errors.push(`Username "${username}" does not exist`);
    }
    // ----------

    // type === sign_up
    if (type === 'sign_up') {
      if (minLength(username, length))
        errors.push(
          `Your username is too short. The minimum length is ${length} characters.`
        );
      if (await userExists(username)) errors.push('Username taken.');
    }
    // ----------
    result.username = {
      ok: !errors.length,
      errors,
    };

    if (errors.length) result.ok = false;
  }

  // Password checks
  if (typeof password !== 'undefined') {
    const errors = [];
    const length = 7;

    if (isEmpty(password)) errors.push('Please enter a password.');
    if (invalidChar(password, passRegExp))
      errors.push(
        'Your password may only contain latin letters, numbers and special symbols.'
      );
    // type === log_in
    if (type === 'log_in') {
      if (await incorrectPassword(username, password))
        errors.push('The password you entered is incorrect. Try again...');
    }
    // ----------
    // type === sign_up
    if (type === 'sign_up') {
      if (minLength(password, length))
        errors.push(
          `Your password is too short. The minimum length is ${length} characters.`
        );
      if (!oneUppercase(password))
        errors.push('Your password must have at least one uppercase letter.');
    }
    // ----------

    result.password = {
      ok: !errors.length,
      errors,
    };

    if (errors.length) result.ok = false;
  }

  // Email checks
  if (typeof email !== 'undefined') {
    const errors = [];

    if (isEmpty(email)) errors.push('Please enter an email.');
    if (emailFormat(email)) errors.push('Invalid email format.');
    if (await emailTaken(email))
      errors.push('This email has already been taken.');

    result.email = {
      ok: !errors.length,
      errors,
    };

    if (errors.length) result.ok = false;
  }

  if (Object.keys(result).length < 3) result.ok = false;

  return result;
};

module.exports = {
  check,
};
