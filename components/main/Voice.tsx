import { FC, useEffect } from 'react';
import { init_voice } from '../../store/actions/voiceActions';
import { useAppDispatch } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const Voice: FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init_voice());
  }, []);

  return <></>;
};

export default Voice;
