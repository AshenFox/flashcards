import '../styles/main.scss';
import { Provider } from 'react-redux';
import Head from '../components/main/Head';
import store from '../store/store';
import AuthWrapper from '../components/main/AuthWrapper';
import PasteControl from '../components/main/PasteControl';
import Voice from '../components/main/Voice';
import RouterConfiguration from '../components/main/RouterConfiguration';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Provider store={store}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
        <Voice />
        <RouterConfiguration />
      </Provider>
      <PasteControl />
    </>
  );
}

export default MyApp;

// http://192.168.1.67/
// ipconfig ===== new Date

/* const sr_stages = [
  {
    stage: 2,
    nextRep: 900000,
    prevStage: 2700000,
  },
  {
    stage: 3,
    nextRep: 3600000,
    prevStage: 10800000,
  },
  {
    stage: 4,
    nextRep: 10800000,
    prevStage: 32400000,
  },
  {
    stage: 5,
    nextRep: 86400000,
    prevStage: 259200000,
  },
  {
    stage: 6,
    nextRep: 172800000,
    prevStage: 518400000,
  },
  {
    stage: 7,
    nextRep: 345600000,
    prevStage: 1036800000,
  },
  {
    stage: 8,
    nextRep: 604800000,
    prevStage: 1814400000,
  },
  {
    stage: 9,
    nextRep: 1209600000,
    prevStage: 3628800000,
  },
  {
    stage: 10,
    nextRep: 2419200000,
    prevStage: 7257600000,
  },
  {
    stage: 11,
    nextRep: 4838400000,
    prevStage: 14515200000,
  },
];

const user = { _id: 'хуй вам а не id' };

const arr = [
  {
    _id: '5ffea7942da0e82dc877fcae',
    moduleID: '5fff30b48c4db613dccf4c5b',
    term: 'Crocodile',
    defenition: 'Crocodile',
    imgurl:
      'https://thumbs.dreamstime.com/b/crocodile-sunning-itself-shallows-crocodile-sunning-itself-shallows-showing-teeth-going-hunting-166777043.jpg',
    creation_date: new Date('2021-01-13T07:56:04.771Z'),
    studyRegime: true,
    stage: 2,
    nextRep: new Date('2021-01-20T20:23:38.179Z'),
    prevStage: new Date('2021-01-20T20:53:38.179Z'),
    __v: 0,
    lastRep: new Date('2021-01-20T20:08:38.179Z'),
  },
  {
    _id: '5ffea7942da0e82dc877fcad',
    moduleID: '5fff30b48c4db613dccf4c5b',
    term: 'Bird',
    defenition: 'Bird',
    imgurl:
      'http://greatmissouribirdingtrail.com/Wordpress/wp-content/uploads/2016/02/Prothonotary-Warbler-750x500.jpg',
    creation_date: new Date('2021-01-13T07:56:04.770Z'),
    studyRegime: true,
    stage: 3,
    nextRep: new Date('2021-01-20T21:07:53.678Z'),
    prevStage: new Date('2021-01-20T23:07:53.678Z'),
    __v: 0,
    lastRep: new Date('2021-01-20T20:07:53.678Z'),
  },
  {
    _id: '5ffea7942da0e82dc877fcaf',
    moduleID: '5fff30b48c4db613dccf4c5b',
    term: 'Dog',
    defenition: 'Dog',
    imgurl:
      'https://arc-anglerfish-arc2-prod-tbt.s3.amazonaws.com/public/37KNC6WENUI6TKTRIBWI6S7HAY.jpg',
    creation_date: new Date('2021-01-13T07:56:04.772Z'),
    studyRegime: true,
    stage: 3,
    nextRep: new Date('2021-01-20T21:07:54.697Z'),
    prevStage: new Date('2021-01-20T23:07:54.697Z'),
    __v: 0,
    lastRep: new Date('2021-01-20T20:07:54.697Z'),
  },
];

const create_notifications = (cards) => {
  const notifArr = [];
  let notif;
  let remindTime;

  for (let card of cards) {
    console.log(card);

    if (card.nextRep.getTime() - Date.now() <= 0) {
      // console.log(card);
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

      console.log(
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
      );

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

  console.log(notifArr);
};

create_notifications(arr); */

// console.log(create_notifications);
