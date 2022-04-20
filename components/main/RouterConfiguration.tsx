import { FC } from 'react';
import { useEffect, useRef } from 'react';
import { set_main_loading } from '../../store/actions/mainActions';
import Router from 'next/router';
import { useAppDispatch } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const RouterConfiguration: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const baseRef = useRef<string>(null);

  useEffect(() => {
    Router.events.on('routeChangeComplete', (url: string) => {
      const base = url.match(/\/.[^\/]*/)[0];

      if (base !== baseRef.current) dispatch(set_main_loading(true));

      baseRef.current = base;
    });
  }, []);

  return <></>;
};

export default RouterConfiguration;
