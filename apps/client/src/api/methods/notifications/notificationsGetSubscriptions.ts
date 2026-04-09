import { SubscriptionDto } from "@flashcards/common";

import axiosInstance from "../../axiosInstance";

export const notificationsGetSubscriptions = async (): Promise<
  SubscriptionDto[]
> => {
  const { data } = await axiosInstance.get<SubscriptionDto[]>(
    "notifications/subscriptions",
  );
  return data;
};
