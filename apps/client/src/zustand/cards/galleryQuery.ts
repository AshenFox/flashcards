import { scrapeSearchImages } from "@api/methods";
import type { ImgurlObjs } from "./types";
import { useQuery } from "@tanstack/react-query";

import { imgUrlArrToObj } from "./helpers";

export const galleryQueryKey = (_id: string, queryStr: string) =>
  ["gallery-images", _id, queryStr] as const;

export type GalleryImagesCache = { imgurl_obj: ImgurlObjs; all: number };

/** Gallery images cache – data populated by searchImages mutation via setQueryData. */
export const useGalleryImagesQuery = (_id: string, queryStr: string) => {
  return useQuery({
    queryKey: galleryQueryKey(_id, queryStr),
    queryFn: async () => {
      if (!queryStr) return { imgurl_obj: {} as ImgurlObjs, all: 0 };
      const regexpURL = /^@url - /;
      if (regexpURL.test(queryStr)) {
        const url = queryStr.replace(regexpURL, "").trim();
        return { imgurl_obj: imgUrlArrToObj([{ url }]), all: 1 };
      }
      const data = await scrapeSearchImages(queryStr);
      return { imgurl_obj: imgUrlArrToObj(data), all: data.length };
    },
    enabled: false,
  });
};
