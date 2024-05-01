import { useEffect, useRef, MouseEvent as ReactMouseEvent, memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

type ConfirmPopupProps = {
  active: boolean;
  question: string;
  className?: string;
  setActive: (value: boolean) => void;
  onConfirm?: (...args: unknown[]) => unknown;
};

const ConfirmPopup = ({
  active,
  question,
  className,
  setActive,
  onConfirm,
}: ConfirmPopupProps) => {
  useEffect(() => {
    setTimeout(
      () =>
        active
          ? window.addEventListener('click', deactivateConfirm.current)
          : window.removeEventListener('click', deactivateConfirm.current),
      0
    );

    return () => window.removeEventListener('click', deactivateConfirm.current);
  }, [active]);

  const deactivateConfirm = useRef((e: MouseEvent) => {
    let questionEl = (e.target as HTMLElement).closest(`.${s.confirm}`);
    let questionAnswerEl = (e.target as HTMLElement).closest(`.${s.answer}`);

    if (questionEl) {
      if (questionAnswerEl) setActive(false);
    } else {
      setActive(false);
    }
  });

  const clickYes = (e: ReactMouseEvent<HTMLDivElement>) => onConfirm?.();

  return (
    <div
      className={clsx(s.confirm, active && s.active, 'confirm-popup__confirm', className)}
    >
      <p>{question}</p>
      <div
        className={clsx(s.answer, 'confirm-popup__answer')}
        data-answer='true'
        onClick={clickYes}
      >
        <span>Yes</span>
      </div>
      <div className={clsx(s.answer, 'confirm-popup__answer')} data-answer='false'>
        <span>No</span>
      </div>
    </div>
  );
};

export default memo(ConfirmPopup);
