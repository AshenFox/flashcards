import axiosInstance from "../../axiosInstance";

export type CodSection = {
  part_of_speech: string;
  sub_sections: {
    blocks: {
      definition: string;
      examples: string[];
    }[];
    guideword: string;
  }[];
  transcr_uk: string;
  transcr_us: string;
};

export type CodReply = CodSection[];

export type CodDictResult = {
  type: "cod";
  data: CodReply;
};

export type UrbanPanel = {
  definition: string;
  example: string;
};

export type UrbanReply = UrbanPanel[];

export type UrbanDictResult = {
  type: "urban";
  data: UrbanReply;
};


export async function getScrapeDictionary(
  value: "cod",
  query: string,
): Promise<CodReply>;
export async function getScrapeDictionary(
  value: "urban",
  query: string,
): Promise<UrbanReply>;
export async function getScrapeDictionary(
  value: "cod" | "urban",
  query: string,
): Promise<CodReply | UrbanReply> {
  const { data } = await axiosInstance.get<CodReply | UrbanReply>(
    `scrape/${value}`,
    { params: { query } },
  );
  return data;
}
