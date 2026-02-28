import axiosInstance from "../../axiosInstance";

export const updateNotificationsSubscription = async (
  id: string,
  body: { name: string },
): Promise<void> => {
  await axiosInstance.put(`notifications/subscription/${id}`, body);
};
