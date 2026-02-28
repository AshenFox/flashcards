import axiosInstance from "../../axiosInstance";

export type DropCardsSRResponse = {
  stage: number;
  nextRep: string;
  prevStage: string;
  lastRep: string;
};

export const srDropCards = async (
  _id_arr: string[],
): Promise<DropCardsSRResponse> => {
  const { data } = await axiosInstance.put<DropCardsSRResponse>("sr/drop", {
    _id_arr,
  });
  return data;
};
