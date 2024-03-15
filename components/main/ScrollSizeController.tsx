import React, { useState, useEffect, useRef, FC } from 'react';
import { useActions } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const ScrollSizeController: FC<Props> = () => {
  const { set_scroll_width, set_is_scroll } = useActions();

  const [isHidden, setIsHidden] = useState(false);
  const scrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollDiv.current) {
      set_scroll_width(scrollDiv.current.offsetWidth - scrollDiv.current.clientWidth);
    }
  }, [set_scroll_width]);

  useEffect(() => {
    setIsHidden(true);

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      set_is_scroll(window.innerWidth - document.documentElement.clientWidth !== 0)
    );
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return isHidden ? <></> : <div ref={scrollDiv} className='scroll-size' />;
};

export default ScrollSizeController;
