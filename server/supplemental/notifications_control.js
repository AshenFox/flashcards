const userModel = require('../models/user_model.js');
const notificationModel = require('../models//notification_model.js');
const cardModelGenerator = require('../models/card_model.js');
const sr_stages = require('./sr_stages');
const webpush = require('web-push');

// Tests

const newNotif = async () => {
  try {
    let notif = await notificationModel.create({
      time: new Date(Date.now() - 5000),
      number: 5,
      user_id: '5fb4db2f7167e40004811126',
    });

    console.log(notif);
  } catch (err) {
    console.log(err);
    return false;
  }
};

// ========================

const send_notifications = async () => {
  try {
    const users = {};

    const now = new Date(Date.now());

    const filterObj = {
      time: { $lt: now },
    };

    if (!(await notificationModel.countDocuments(filterObj))) return; // false

    let notifications = await notificationModel.find(filterObj);

    for (let notif of notifications) {
      const _id = notif.user_id;

      if (!users.hasOwnProperty(_id)) {
        const user = await userModel.findOne({ _id });
        users[_id] = user;
      }

      const payload = {
        title: "It's time to study some cards!",
      };

      //   console.log(notif.number);

      if (notif.number) {
        payload.body = `You have ${notif.number} card${
          notif.number > 1 ? 's' : ''
        } to repeat`;
      } else {
        payload.body = 'You still have cards to repeat :)';
      }

      const { pc, tablet, mobile } = users[_id].subscriptions;

      const errCallback = (err) => {
        if (err.statusCode === 404 || err.statusCode === 410) {
          console.log('Subscription has expired or is no longer valid: ', err);
        } else {
          console.log(err);
        }
      };

      const payloadJSON = JSON.stringify(payload);

      if (pc) webpush.sendNotification(pc, payloadJSON).catch(errCallback);
      if (tablet) webpush.sendNotification(tablet, payloadJSON).catch(errCallback);
      if (mobile) webpush.sendNotification(mobile, payloadJSON).catch(errCallback);

      await notificationModel.deleteOne({ _id: notif._id });
    }

    /* let result = {
        users,
        notifications,
      };
  
      return result; */
  } catch (err) {
    console.error(err.message);
  }
};

const usersNotifTimers = {};

const notification_timeout = async (user) => {
  try {
    if (usersNotifTimers[user._id]) clearTimeout(usersNotifTimers[user._id]);

    usersNotifTimers[user._id] = setTimeout(async () => {
      await create_notifications(user); // !!!
      usersNotifTimers[user._id] = false;
    }, 500);
  } catch (err) {
    console.error(err.message);
  }
};

const create_notifications = async (user) => {
  try {
    await notificationModel.deleteMany({ user_id: user._id });

    const cardModel = cardModelGenerator(user.username);

    const filterObj = {
      studyRegime: true,
    };

    if (!(await cardModel.countDocuments(filterObj))) return; // false

    const cards = await cardModel.find(filterObj).sort({ nextRep: 1 }); // mongo sort???

    // cards.sort((a, b) => a.nextRep.getTime() - b.nextRep.getTime());

    const notifArr = [];
    let notif;
    let remindTime;

    for (let card of cards) {
      //   console.log(card);

      if (card.nextRep.getTime() - Date.now() <= 0) {
        continue;
      }

      if (!notif) {
        notif = {
          cards: [card],
          number: 1,
          calcTime: card.nextRep,
          calcPrevStage: card.prevStage,
          time: card.nextRep,
          user_id: user._id,
          stage: card.stage,
        };

        notifArr.push(notif);

        remindTime = new Date(
          new Date(notif.calcTime.getTime() + 86400000).setHours(12, 0, 0, 0)
        );
      } else {
        let stageDelay;
        // New logic
        if (
          card.stage < notif.stage &&
          card.prevStage.getTime() < notif.calcPrevStage.getTime()
        ) {
          notif.stage = card.stage;
          notif.calcTime = card.nextRep;
          notif.calcPrevStage = card.prevStage;
          notif.time = card.nextRep;
        }

        if (notif.stage >= 3) stageDelay = sr_stages[1].prevStage - sr_stages[1].nextRep;
        if (notif.stage === 2)
          stageDelay =
            sr_stages[notif.stage - 2].prevStage - sr_stages[notif.stage - 2].nextRep;
        if (notif.stage === 1) stageDelay = 0;

        /* console.log(
          'card.nextRep.getTime()',
          card.nextRep.getTime(),
          'notif.calcTime.getTime()',
          notif.calcTime.getTime()
        );

        console.log(
          'card.nextRep.getTime() - notif.calcTime.getTime()',
          card.nextRep.getTime() - notif.calcTime.getTime(),
          'stageDelay',
          stageDelay
        ); */

        if (card.nextRep.getTime() - notif.calcTime.getTime() < stageDelay) {
          notif.cards.push(card);
          notif.number++;
          notif.time = card.nextRep;
        } else {
          notif = {
            cards: [card],
            number: 1,
            calcTime: card.nextRep,
            calcPrevStage: card.prevStage,
            time: card.nextRep,
            user_id: user._id,
            stage: card.stage,
          };

          notifArr.push(notif);
        }
      }
    }

    if (notifArr.length) {
      for (let i = 0; i < 4; i++) {
        notifArr.push({
          cards: [],
          number: 0,
          time: remindTime,
          user_id: user._id,
        });

        remindTime = new Date(remindTime.getTime() + 86400000);
      }
    }

    await notificationModel.insertMany(notifArr);
    /* for (let notif of notifArr) {
        await notificationModel.create(notif);
      } */
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  notification_timeout,
  send_notifications,
};
