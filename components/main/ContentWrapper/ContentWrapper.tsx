import { FC, ReactNode } from 'react';
import s from './styles.module.scss';

interface OwnProps {
  children: ReactNode;
  tagType?: keyof JSX.IntrinsicElements;
}

type Props = OwnProps;

const ContentWrapper: FC<Props> = ({ children, tagType = 'main' }) => {
  const WrapperTag = tagType;

  return <WrapperTag className={s.wrapper}>{children}</WrapperTag>;
};

export default ContentWrapper;
