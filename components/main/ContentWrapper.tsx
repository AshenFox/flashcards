import { CSSProperties, FC, ReactNode } from 'react';
import { useAppSelector } from '../../store/store';

interface OwnProps {
  children: ReactNode;
  tagType?: keyof JSX.IntrinsicElements;
}

type Props = OwnProps;

const ContentWrapper: FC<Props> = ({ children, tagType = 'main' }) => {
  const { is_scroll, scroll_width } = useAppSelector(({ dimen }) => dimen);

  const Wrapper = tagType;

  const mainSyle: CSSProperties = {
    paddingRight: `${scroll_width}px`,
  };

  return <Wrapper style={is_scroll ? {} : mainSyle}>{children}</Wrapper>;
};

export default ContentWrapper;
