import { FC, useEffect } from 'react';
import { useActions } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Voice: FC<Props> = () => {
  const { init_voice } = useActions();

  useEffect(() => {
    init_voice();
  }, []);

  return <></>;
};

export default Voice;
