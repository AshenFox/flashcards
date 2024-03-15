import { FC, useEffect } from 'react';
import { useActions } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Voice: FC<Props> = () => {
  const { init_easy_speech } = useActions();

  useEffect(() => {
    init_easy_speech();
  }, [init_easy_speech]);

  return <></>;
};

export default Voice;
