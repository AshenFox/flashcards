import { useRef, useEffect, FC, ChangeEvent, MouseEvent, TouchEvent } from 'react';
import { set_sr_counter } from '../../../store/actions/srActions';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const SrCounter: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { counter } = useAppSelector(({ sr }) => sr);

  const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(set_sr_counter(null, e.target.value));

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const blockSingle = useRef<boolean>(false);

  const single = (value: 'stepUp' | 'stepDown') => (e: MouseEvent<HTMLDivElement>) => {
    if (blockSingle.current) return;
    if (value === 'stepUp') dispatch(set_sr_counter(1));
    if (value === 'stepDown') dispatch(set_sr_counter(-1));
  };

  const multiple =
    (value: 'stepUp' | 'stepDown') =>
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        blockSingle.current = true;

        intervalRef.current = setInterval(() => {
          if (value === 'stepUp') dispatch(set_sr_counter(5));
          if (value === 'stepDown') dispatch(set_sr_counter(-5));
        }, 100);
      }, 500);
    };

  useEffect(() => {
    const cleanup = (e: Event) => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
      blockSingle.current = false;
    };

    window.addEventListener('mouseup', cleanup);
    window.addEventListener('touchend', cleanup);
    document.addEventListener('mouseleave', cleanup);

    return () => {
      window.removeEventListener('mouseup', cleanup);
      window.removeEventListener('touchend', cleanup);
      document.removeEventListener('mouseleave', cleanup);
    };
  }, []);

  return (
    <div className='home__counter-container'>
      <div className='home__counter'>
        <div
          className='home__counter-subtract'
          onMouseDown={multiple('stepDown')}
          onTouchStart={multiple('stepDown')}
          onMouseUp={single('stepDown')}
        />
        <input
          type='number'
          className='home__counter-number'
          onChange={handleCounterChange}
          value={counter}
        />
        <div
          className='home__counter-add'
          onMouseDown={multiple('stepUp')}
          onTouchStart={multiple('stepUp')}
          onMouseUp={single('stepUp')}
        />
      </div>
    </div>
  );
};

export default SrCounter;
