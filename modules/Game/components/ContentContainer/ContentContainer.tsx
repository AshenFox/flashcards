import { CSSProperties, ReactNode, memo, useMemo } from 'react';
import { useAppSelector } from '@store/hooks';
import clsx from 'clsx';
import s from './styles.module.scss';

type ContentContainerProps = {
  loading: boolean;
  children: ReactNode;
  isScrollable?: boolean;
};

const ContentContainer = ({
  loading,
  children,
  isScrollable = true,
}: ContentContainerProps) => {
  const header_height = useAppSelector(s => s.dimen.header_height);
  const game_controls_height = useAppSelector(s => s.dimen.game_controls_height);
  const is_server = useAppSelector(s => s.main.is_server);

  const styles: CSSProperties = useMemo(
    () => ({
      height: `${
        !is_server
          ? document.documentElement.clientHeight -
            header_height -
            (document.documentElement.clientWidth < 992 ? game_controls_height : 0)
          : 0
      }px`,
    }),
    [game_controls_height, header_height, is_server]
  );

  return (
    <main
      className={clsx(s.container, isScrollable ? s.scrollable : s.unscrollable)}
      style={styles}
    >
      <div className={clsx(s.components, isScrollable ? s.scrollable : s.unscrollable)}>
        {loading ? <div className='game__loading-spinner' /> : children}
      </div>
    </main>
  );
};

export default memo(ContentContainer);
