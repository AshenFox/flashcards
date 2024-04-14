import { MouseEventHandler, ReactNode, TouchEventHandler, memo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import Tooltip, { tooltipContainer } from '@ui/Tooltip';

type SwitchProps = {
  id: string;
  active: boolean;
  className?: string;
  small?: boolean;
  icon?: ReactNode;
  iconSize?: number;
  tooltip?: string;
  onClick?: MouseEventHandler<HTMLLabelElement>;
  onMouseDown?: MouseEventHandler<HTMLLabelElement>;
  onMouseUp?: MouseEventHandler<HTMLLabelElement>;
  onTouchStart?: TouchEventHandler<HTMLLabelElement>;
  onTouchEnd?: TouchEventHandler<HTMLLabelElement>;
};

const Switch = ({
  id,
  active,
  small = false,
  className,
  icon,
  iconSize,
  tooltip,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}: SwitchProps) => {
  const innerIconSize = iconSize ?? small ? 17 : 28;

  return (
    <div className={clsx(s.container, tooltipContainer, className)}>
      <input
        className={'switch__checkbox'}
        type='checkbox'
        id={id}
        checked={active}
        readOnly
      />
      {typeof icon === 'string' ? (
        <svg height={innerIconSize} width={innerIconSize}>
          <use href={`../img/sprite.svg#${icon}`}></use>
        </svg>
      ) : (
        icon
      )}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      <label
        className={clsx('switch__switch', small && s.small)}
        htmlFor={id}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
    </div>
  );
};

export default memo(Switch);