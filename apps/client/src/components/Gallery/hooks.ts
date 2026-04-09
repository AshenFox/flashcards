import { scrapeSearchImages } from "@api/methods";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import type { ImgurlBase, ImgurlObjs } from "./types";

const regexpURL = /^@url - /;
const emptyQueryErrorMessage = "Query can not be empty.";
const serviceUnavailableErrorMessage =
  "The service is currently unavailable. Please try later...";

export const useCardGallery = (_id: string) => {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState(0);
  const [imgurlObj, setImgurlObj] = useState<ImgurlObjs>({});

  const {
    refetch,
    isFetching: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gallery-images", _id, query],
    enabled: false,
    queryFn: async () => {
      const queryStr = query;
      const error = new Error(emptyQueryErrorMessage);

      if (!queryStr) throw error;

      const isURL = regexpURL.test(queryStr);

      if (isURL) {
        const url = queryStr.replace(regexpURL, "").trim();
        if (!url) throw error;
        const imgurl_obj: ImgurlObjs = { "0": { url, ok: true } };
        return { imgurl_obj, all: 1 };
      }

      let data: ImgurlBase[] = [];

      try {
        data = await scrapeSearchImages(queryStr);
      } catch {
        throw new Error(serviceUnavailableErrorMessage);
      }

      const imgurl_obj = data.reduce<ImgurlObjs>((acc, item, index) => {
        acc[String(index)] = { ok: true, ...item };
        return acc;
      }, {});

      return { imgurl_obj, all: data.length };
    },
    retry: 0,
  });

  const totalCount = useMemo(() => Object.keys(imgurlObj).length, [imgurlObj]);

  const width =
    totalCount === 0 ? 0 : 2 + 15 * totalCount + 2 * (totalCount - 1);

  const searchImages = () => {
    setPosition(0);
    refetch().then(res => {
      if (res.data?.imgurl_obj) setImgurlObj(res.data.imgurl_obj);
    });
  };

  const setImageOk = (index: string, ok: boolean) => {
    setImgurlObj(prev => {
      const existing = prev[index];
      if (!existing) return prev;

      return {
        ...prev,
        [index]: { ...existing, ok },
      };
    });
  };

  const moveGallery = (direction: "left" | "right") => {
    setPosition(prev => prev + (direction === "left" ? 17 : -17));
  };

  return {
    query,
    isLoading,
    isError,
    error,
    position,
    width,
    imgurl_obj: imgurlObj,
    searchImages,
    setQuery,
    setImageOk,
    moveGallery,
  };
};
