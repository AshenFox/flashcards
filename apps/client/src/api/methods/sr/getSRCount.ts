import axiosInstance from "../../axiosInstance";

export type GetSRCountResponse = {
  all_num: number;
  repeat_num: number;
  next_num: number;
  next_date: string;
};

export const getSRCount = async (): Promise<GetSRCountResponse> => {
  const { data } = await axiosInstance.get<GetSRCountResponse>("sr/count");
  return data;
};
