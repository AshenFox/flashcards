import { CSSProperties, MouseEvent, memo } from 'react';
import { useActions, useAppSelector } from '../../store/hooks';

const Start = () => {
  const { change_modal, toggle_modal } = useActions();

  const {
    dimen: { header_height },
    main: { is_server },
  } = useAppSelector(state => state);

  const click = (value: 'log_in') => (e: MouseEvent<HTMLButtonElement>) => {
    change_modal(value);
    toggle_modal();
  };

  const startStyles: CSSProperties = {
    minHeight: `${
      !is_server ? 0.1 + document.documentElement.clientHeight - header_height : 0
    }px`,
  };

  return (
    <main className='start'>
      <div className='start__content'>
        <div className='start__intro' style={startStyles}>
          <div className='start__welcome'>
            <h2>Welcome to</h2>
            <h1>Flash Cards</h1>
            <p>
              Web application for memorizing information via spaced repetition and
              interactive and engaging games.
            </p>
          </div>
          <button
            onClick={click('log_in')}
            className='btn bcc-lightblue pad15-60 brr15 white fz175 h-grey h-bcc-yellow'
          >
            Get started
          </button>
        </div>
      </div>
    </main>
  );
};

export default memo(Start);
