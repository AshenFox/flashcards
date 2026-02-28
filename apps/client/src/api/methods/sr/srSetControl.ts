import axiosInstance from "../../axiosInstance";

export const srSetControl = async (
  _id_arr: string[],
  study_regime: boolean,
): Promise<void> => {
  await axiosInstance.put<{ msg: string }>("sr/control", {
    _id_arr,
    study_regime,
  });
};
