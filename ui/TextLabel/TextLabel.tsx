import React, { memo, useCallback, MouseEventHandler, LabelHTMLAttributes } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

const getLastNode = (nodes: NodeListOf<ChildNode>) => {
  const lastNode = nodes[nodes.length - 1];
  const childNodes = lastNode.childNodes;

  if (childNodes.length) {
    return getLastNode(childNodes);
  }

  return lastNode;
};

type TextLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: string;
  error?: boolean;
  errorMessage?: string;
  htmlFor?: string;
};

const TextLabel = ({
  children,
  error = false,
  errorMessage = '',
  htmlFor,
  className,
  onClick,
  ...rest
}: TextLabelProps) => {
  const onInnerLabelClick = useCallback<MouseEventHandler<HTMLLabelElement>>(
    e => {
      onClick?.(e);

      if (htmlFor) {
        const el = window?.document?.getElementById(htmlFor);

        if (el?.contentEditable === 'true') {
          try {
            const range = document?.createRange();
            const sel = window?.getSelection();
            const lastNode = getLastNode(el?.childNodes);

            range?.setStart(lastNode, lastNode?.textContent.length ?? 0);
            range?.collapse(true);

            sel?.removeAllRanges();
            sel?.addRange(range);
          } catch (err) {
            console.log(err);
          }

          el.focus({ preventScroll: true });
        }
      }
    },
    [htmlFor, onClick]
  );

  return (
    <label
      {...rest}
      className={clsx(
        'text_label__label',
        s.label,
        error && s.error,
        !!htmlFor && s.active,
        className
      )}
      htmlFor={htmlFor}
      onClick={onInnerLabelClick}
    >
      {error && errorMessage ? errorMessage : children}
    </label>
  );
};

export default memo(TextLabel);
