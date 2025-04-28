type DeleteNotificationsSubscriptionParamsCreator = {
  _id: string;
};

type DeleteNotificationsSubscriptionResponseCreator = {
  msg: string;
};

// server types
export type DeleteNotificationsSubscriptionParams =
  DeleteNotificationsSubscriptionParamsCreator;
export type DeleteNotificationsSubscriptionResponse =
  DeleteNotificationsSubscriptionResponseCreator;

// api types
export type DeleteNotificationsSubscriptionParamsDto =
  DeleteNotificationsSubscriptionParamsCreator;
export type DeleteNotificationsSubscriptionResponseDto =
  DeleteNotificationsSubscriptionResponseCreator;
