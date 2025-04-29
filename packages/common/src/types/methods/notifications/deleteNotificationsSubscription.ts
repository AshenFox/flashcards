type ParamsCreator = {
  _id: string;
};

type ResponseCreator = {
  msg: string;
};

// server types
export type DeleteNotificationsSubscriptionParams = ParamsCreator;
export type DeleteNotificationsSubscriptionResponse = ResponseCreator;

// api types
export type DeleteNotificationsSubscriptionParamsDto = ParamsCreator;
export type DeleteNotificationsSubscriptionResponseDto = ResponseCreator;
