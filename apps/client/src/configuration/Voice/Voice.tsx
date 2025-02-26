import { memo, useEffect } from "react";

import { useActions } from "../../store/hooks";

const Voice = () => {
  const { initEasySpeech } = useActions();

  useEffect(() => {
    initEasySpeech();
  }, [initEasySpeech]);

  return <></>;
};

export default memo(Voice);
