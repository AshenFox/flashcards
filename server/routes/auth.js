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

/* 

async sign_up(data, res) {
    let { username, email, password } = data;

    if (await this.checkUser(username, email, password)) {
      let reqData = {
        server_id: uuidv4(),
        username,
        email,
        password,
        registration_date: new Date(),
      };

      // let salt = bcrypt.genSaltSync(10);
      // let hash = bcrypt.hashSync(reqData.password, salt);
      // reqData.password = hash;

      try {
        reqData.password = await new Promise((resolve, reject) => {
          bcrypt.hash(reqData.password, 10, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });
      } catch (err) {
        console.log(err);
      }

      console.log(reqData.password);
      console.log("A new user has been signed up!");
      console.log(reqData);

      await userModel.create(reqData, (err) => {
        console.log(err);
      });

      // let token = await auth.createToken(reqData.server_id);
      // auth.setCookie(res, token);

      console.log("A new user has been signed up!");
      return true;
    } else {
      console.log(`The user doesn't meet all the requirements!`);
      return false;
    }
  },

*/

/* 

async log_in(data, res) {
    let { username, password } = data;

    if (await this.checkUser(username, password)) {
      let userID = await auth.fetchUserID(username);
      let token = await auth.createToken(userID);
      // auth.setCookie(res, token);
      console.log(`A user has logged in!`);
      // return true;
      return {
        value: true,
        token,
      };
    } else {
      console.log(`The user doesn't meet all the requirements!`);
      // return false;

      return {
        value: false,
        token,
      };
    }
  },

*/

// =======================================
// =======================================
// =======================================

// @route ------ POST api/food
// @desc ------- Register food items
// @access ----- Public
/* 
router.post("/", async (req, res) => {
  try {
    let foodArr = req.body;

    let arrId = [];

    for (let item of foodArr) {
      let foodItem = Food(item);
      await foodItem.save();
      arrId.push(foodItem._id);
    }

    res.status(201).json({ arrId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route ------ DELETE api/food
// @desc ------- Delete one food item
// @access ----- Public

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let foodItem = await Food.findById(id);

    if (!foodItem) return res.status(404).json({ msg: "Food item not found" });

    await Food.findByIdAndDelete(id);

    res.status(200).json({ msg: "Food item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route ------ DELETE api/food
// @desc ------- Delete all food items
// @access ----- Public

router.delete("/", async (req, res) => {
  try {
    await Food.deleteMany({}, (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "All food items has been deleted!" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); */
