import axiosInstance from "../../axiosInstance";

export type SubscribePushBody = {
  name: string;
  subscriptionData: PushSubscriptionJSON;
};

export const notificationsSubscribePush = async (
  body: SubscribePushBody,
): Promise<void> => {
  await axiosInstance.post("notifications/subscribe", body);
};
