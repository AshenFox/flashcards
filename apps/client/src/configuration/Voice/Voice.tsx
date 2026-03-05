import { initEasySpeech, useVoiceStore } from "@zustand/voice";
import { memo, useEffect } from "react";

const Voice = () => {
  const setVoicesAndWorking = useVoiceStore((s) => s.setVoicesAndWorking);

  useEffect(() => {
    initEasySpeech(setVoicesAndWorking);
  }, [setVoicesAndWorking]);

  return <></>;
};

export default memo(Voice);
