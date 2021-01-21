const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model.js');

const { auth } = require('../supplemental/middleware');

// @route ------ PUT api/notifications/subscribe
// @desc ------- Update subscription
// @access ----- Private

router.put('/subscribe', auth, async (req, res) => {
  try {
    const { device, subscription } = req.body;

    const server_id = req.user.server_id;

    const user = await userModel.findOne({
      server_id,
    });

    if (
      !user.subscriptions[device] ||
      !(user.subscriptions[device].endpoint === subscription.endpoint)
    ) {
      user.subscriptions[device] = subscription;
      await user.save();

      res.status(200).json({ msg: 'Subscribtion has been updated' });
      return;
    }

    res.status(200).json({ msg: 'Subscription is actual' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

module.exports = router;
