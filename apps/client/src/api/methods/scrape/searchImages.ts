import axiosInstance from "../../axiosInstance";

export type ImgurlBase = {
  url: string;
  thumbnail?: string;
  snippet?: string;
  context?: string;
};

export const scrapeSearchImages = async (
  query: string,
): Promise<ImgurlBase[]> => {
  const { data } = await axiosInstance.get<ImgurlBase[]>("imgsearch", {
    params: { query },
  });
  return data;
};
