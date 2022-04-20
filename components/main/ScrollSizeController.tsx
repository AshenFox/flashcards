import React, { useState, useEffect, useRef, FC } from 'react';
import { set_scroll_width, set_is_scroll } from '../../store/actions/dimenActions';
import { useAppDispatch } from '../../store/store';

interface OwnProps {}

type Props = OwnProps;

const ScrollSizeController: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [isHidden, setIsHidden] = useState(false);
  const scrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(
      set_scroll_width(scrollDiv.current.offsetWidth - scrollDiv.current.clientWidth)
    );

    setIsHidden(true);

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      dispatch(
        set_is_scroll(window.innerWidth - document.documentElement.clientWidth !== 0)
      )
    );

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return isHidden ? <></> : <div ref={scrollDiv} className='scroll-size' />;
};

export default ScrollSizeController;
