const express = require('express');
const { check } = require('../supplemental/checks');
const router = express.Router();
const userModel = require('../models/user_model.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { auth } = require('../supplemental/middleware');

// const Food = require("../models/Food");

// @route ------ POST api/auth/check/:type
// @desc ------- Check form data of certain type
// @access ----- Public

router.post('/check/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const errors = await check(req.body, type);
    res.status(200).json(errors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ POST api/auth/entry/:type
// @desc ------- Entry a user
// @access ----- Public

router.post('/entry/:type', async (req, res) => {
  try {
    const { type } = req.params;

    const errors = await check(req.body, type);

    const { username, email, password } = req.body;

    const res_data = { errors };

    if (errors.ok) {
      let user;

      if (type === 'log_in') {
        user = await userModel.findOne({
          username,
        });
      } else if (type === 'sign_up') {
        const user_data = {
          server_id: uuidv4(),
          username,
          email,
          registration_date: new Date(),
        };

        user_data.password = await bcrypt.hash(password, 10);

        console.log('A new user has been signed up!');

        user = await userModel.create(user_data);
      }

      if (!user) throw new Error('The user has not been found.');

      const id = user.server_id;

      const token = await jwt.sign({ id }, config.get('jwtSecret'));

      res_data.token = token;

      console.log(`A user has logged in!`);
    }

    res.status(200).json(res_data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/auth
// @desc ------- Authenticate
// @access ----- Private

router.get('/', auth, async (req, res) => {
  try {
    const server_id = req.user.server_id;
    const user = await userModel.findOne({
      server_id,
    });
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

module.exports = router;
