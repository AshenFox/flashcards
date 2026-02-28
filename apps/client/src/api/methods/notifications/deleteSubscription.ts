import axiosInstance from "../../axiosInstance";

export const deleteNotificationsSubscription = async (id: string): Promise<void> => {
  await axiosInstance.delete(`notifications/subscription/${id}`);
};
