import axiosInstance from "../../axiosInstance";

export const notificationsUpdateSubscription = async (
  id: string,
  body: { name: string },
): Promise<void> => {
  await axiosInstance.put(`notifications/subscription/${id}`, body);
};
