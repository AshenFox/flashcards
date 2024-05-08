import webpush from "web-push";

import notificationModel from "../models//notification_model";
import cardModelGenerator from "../models/card_model";
import userModel, { IUser } from "../models/user_model";
import { ICard } from "./../models/card_model";
import sr_stages from "./sr_stages";

// Tests
// unsafely-treat-insecure-origin-as-secure flag allows to send notifications without ssl

/* const newNotif = async () => {
  try {
    let notif = await notificationModel.create({
      time: new Date(Date.now() - 5000),
      number: 5,
      user_id: '66033412798e253851f14ea4',
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
      [key: string]: IUser;
    } = {};

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

      const { pc, tablet, mobile } = users[_id].subscriptions;

      const errCallback = (err: any) => {
        console.log("Something went wrong: ", err);
      };

      const payloadJSON = JSON.stringify(payload);

      if (pc) webpush.sendNotification(pc, payloadJSON).catch(errCallback);
      if (tablet)
        webpush.sendNotification(tablet, payloadJSON).catch(errCallback);
      if (mobile)
        webpush.sendNotification(mobile, payloadJSON).catch(errCallback);

      await notificationModel.deleteOne({ _id: notif._id });
    }
  } catch (err) {
    console.error(err);
  }
};

const usersNotifTimers: {
  [key: string]: ReturnType<typeof setTimeout>;
} = {};

export const notification_timeout = async (user: IUser) => {
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

interface INotif {
  cards: ICard[];
  number: number;
  calcTime: Date;
  calcPrevStage: Date;
  time: Date;
  user_id: string;
  stage: number;
}

const create_notifications = async (user: IUser) => {
  try {
    await notificationModel.deleteMany({ user_id: user._id });

    const cardModel = cardModelGenerator(user.username);

    const filterObj = {
      studyRegime: true,
    };

    if (!(await cardModel.countDocuments(filterObj))) return;

    const cards = await cardModel.find(filterObj).sort({ nextRep: 1 });

    const notifArr: INotif[] = [];
    let notif: INotif | null = null;
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
