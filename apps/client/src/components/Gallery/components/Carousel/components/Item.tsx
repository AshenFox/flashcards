import clsx from "clsx";
import { memo, SyntheticEvent, useCallback } from "react";

import s from "../styles.module.scss";
import { ImgurlObj } from "@components/Gallery/types";

type ItemProps = {
  index: string;
  data: ImgurlObj;
  onImageStatusChange?: (index: string, ok: boolean) => void;
  onSelectImage?: (url: string) => void;
};

const Item = ({
  index,
  data,
  onImageStatusChange,
  onSelectImage,
}: ItemProps) => {
  const { url, ok } = data;

  const error = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      onImageStatusChange?.(index, false);
    },
    [index, onImageStatusChange],
  );
  const load = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      onImageStatusChange?.(index, true);
    },
    [index, onImageStatusChange],
  );

  const clickGalleryItem = () => {
    onSelectImage?.(url);
  };

  return (
    <figcaption
      className={clsx(s.item, !ok && s.hidden)}
      onClick={clickGalleryItem}
    >
      <img src={url} alt="Gallery img" onLoad={load} onError={error} />
    </figcaption>
  );
};

export default memo(Item);
