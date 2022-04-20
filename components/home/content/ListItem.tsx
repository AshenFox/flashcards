import { FC, ReactNode } from 'react';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const ListItem: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ListItem;
