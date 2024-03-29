import { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useActions, useAppSelector } from '../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const ScrollTop: FC<Props> = () => {
  const { set_scroll_top } = useActions();

  const { scroll_top } = useAppSelector(({ main }) => main);

  const scroll_top_ref = useRef(scroll_top);
  scroll_top_ref.current = scroll_top;

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (window.pageYOffset > 100 && !scroll_top_ref.current) set_scroll_top(true);

      if (window.pageYOffset < 100 && scroll_top_ref.current) set_scroll_top(false);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clickScroll = () => movePageUp();

  return (
    <div className={`scroll ${scroll_top ? 'active' : ''}`} onClick={clickScroll}>
      <svg height='20' width='20'>
        <use href='../img/sprite.svg#icon__arrow_up'></use>
      </svg>
    </div>
  );
};

export default ScrollTop;

let startTime: number = null;

const ease = (
  currentTime: number,
  startValue: number,
  changeInValue: number,
  duration: number
) => {
  currentTime /= duration / 2;

  if (currentTime < 1)
    return (changeInValue / 2) * currentTime * currentTime + startValue;
  currentTime--;
  return (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue;
};

const animation = (currentTime: number) => {
  if (startTime === null) startTime = currentTime;

  let timeElapsed = currentTime - startTime;
  let positionY = ease(timeElapsed, scrollY, -scrollY, 750);

  window.scrollTo(0, positionY);

  if (positionY) {
    requestAnimationFrame(animation);
  } else {
    startTime = null;
  }
};

const movePageUp = () => {
  let pageYOffset: number = window.pageYOffset || document.documentElement.scrollTop;

  if (pageYOffset) requestAnimationFrame(animation);
};
