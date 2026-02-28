import axiosInstance from "../../axiosInstance";

export type PutSRAnswerResponse = {
  stage: number;
  nextRep: string;
  prevStage: string;
  lastRep: string;
  studyRegime: boolean;
};

export const srPutAnswer = async (
  _id: string,
  answer: 1 | -1,
): Promise<PutSRAnswerResponse> => {
  const { data } = await axiosInstance.put<PutSRAnswerResponse>("sr/answer", {
    _id,
    answer,
  });
  return data;
};
