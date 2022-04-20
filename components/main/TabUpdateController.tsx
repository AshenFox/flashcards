import React, { useEffect, FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const TabUpdateController: FC<Props> = () => {
  useEffect(() => {
    const reload = (e: StorageEvent) => window.location.reload();

    window.addEventListener('storage', reload);

    return () => window.removeEventListener('storage', reload);
  }, []);

  return <></>;
};

export default TabUpdateController;
