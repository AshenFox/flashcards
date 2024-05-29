import { memo, useEffect } from "react";

import { useActions } from "../../store/hooks";

const Voice = () => {
  const { init_easy_speech } = useActions();

  useEffect(() => {
    init_easy_speech();
  }, [init_easy_speech]);

  return <></>;
};

export default memo(Voice);
