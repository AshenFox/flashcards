import cardModel from "@models/card_model";
import notificationModel from "@models/notification_model";
import userModel from "@models/user_model";
import { Card, User } from "@serverTypes/entities";
import { FilterQuery } from "mongoose";
import webpush from "web-push";

import sr_stages from "./sr_stages";

// Tests
// unsafely-treat-insecure-origin-as-secure flag allows to send notifications without ssl

/* const newNotif = async () => {
  try {
    let notif = await notificationModel.create({
      time: new Date(Date.now() - 5000),
      number: 5,
      user_id: "5e05ebcab5aee800e02ca833",
    });

    console.log(notif);
  } catch (err) {
    console.log(err);
    return false;
  }
};

newNotif(); */

// ========================

export const send_notifications = async () => {
  try {
    const users: {
      [key: string]: User;
    } = {};

    const now = new Date(Date.now());

    const filterObj = {
      time: { $lt: now },
    };

    const notificationsExist = Boolean(
      await notificationModel.countDocuments(filterObj),
    );

    if (!notificationsExist) return;

    let notifications = await notificationModel.find(filterObj);

    for (let notif of notifications) {
      const _id = notif.user_id;

      if (!users[_id]) {
        const user = await userModel.findOne({ _id });
        if (user) users[_id] = user;
      }

      const payload: {
        title: string;
        body: string;
      } = {
        title: "It's time to study some cards!",
        body: "",
      };

      if (notif.number) {
        payload.body = `You have ${notif.number} card${
          notif.number > 1 ? "s" : ""
        } to repeat`;
      } else {
        payload.body = "You still have cards to repeat :)";
      }

      const subscriptions = users[_id].subscriptions;
      const payloadJSON = JSON.stringify(payload);

      const errCallback = (err: any) => {
        console.log("Something went wrong: ", err);
      };

      // Send notification to all user's subscriptions
      subscriptions.forEach(subscription => {
        webpush
          .sendNotification(subscription.subscriptionData, payloadJSON)
          .catch(errCallback);
      });

      await notificationModel.deleteOne({ _id: notif._id });
    }
  } catch (err) {
    console.error(err);
  }
};

const usersNotifTimers: {
  [key: string]: ReturnType<typeof setTimeout>;
} = {};

export const notification_timeout = async (user: User) => {
  try {
    if (usersNotifTimers[user._id]) clearTimeout(usersNotifTimers[user._id]);

    usersNotifTimers[user._id] = setTimeout(async () => {
      await create_notifications(user); // !!!
      delete usersNotifTimers[user._id];
    }, 500);
  } catch (err) {
    console.error(err);
  }
};

type Notif = {
  cards: Card[];
  number: number;
  calcTime: Date;
  calcPrevStage: Date;
  time: Date;
  user_id: string;
  stage: number;
};

const create_notifications = async (user: User) => {
  try {
    const { _id } = user;

    await notificationModel.deleteMany({ user_id: _id });

    const filterObj: FilterQuery<Card> = {
      author_id: _id,
      studyRegime: true,
    };

    if (!(await cardModel.countDocuments(filterObj))) return;

    const cards = await cardModel.find(filterObj).sort({ nextRep: 1 });

    const notifArr: Notif[] = [];
    let notif: Notif | null = null;
    let remindTime: Date = new Date();

    for (let card of cards) {
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
          new Date(notif.calcTime.getTime() + 86400000).setHours(12, 0, 0, 0),
        );
      } else {
        let stageDelay: number = 0;
        // New logic
        if (
          card.stage < notif.stage &&
          card.prevStage.getTime() < notif.calcPrevStage.getTime()
        ) {
          notif.stage = card.stage;
          notif.calcTime = card.nextRep;
          notif.calcPrevStage = card.prevStage;
          notif.time = card.nextRep;

          if (notifArr.length === 1)
            remindTime = new Date(
              new Date(notif.calcTime.getTime() + 86400000).setHours(
                12,
                0,
                0,
                0,
              ),
            );
        }

        if (notif.stage >= 3)
          stageDelay = sr_stages[1].prevStage - sr_stages[1].nextRep;
        if (notif.stage === 2)
          stageDelay =
            sr_stages[notif.stage - 2].prevStage -
            sr_stages[notif.stage - 2].nextRep;
        if (notif.stage === 1) stageDelay = 0;

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
          calcTime: new Date(),
          calcPrevStage: new Date(),
          stage: 1,
        });

        remindTime = new Date(remindTime.getTime() + 86400000);
      }
    }

    await notificationModel.insertMany(notifArr);
  } catch (err) {
    console.error(err);
  }
};
