import axiosInstance from "../../axiosInstance";

export const notificationsDeleteSubscription = async (id: string): Promise<void> => {
  await axiosInstance.delete(`notifications/subscription/${id}`);
};
