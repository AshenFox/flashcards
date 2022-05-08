import { FC, MouseEvent } from 'react';
import { useActions, useAppSelector } from '../../../store/hooks';
import LoadingButton from '../../main/LoadingButton';

interface OwnProps {}

type Props = OwnProps;

const Delete: FC<Props> = () => {
  const { delete_module, toggle_modal } = useActions();

  const { module } = useAppSelector(({ main }) => main);

  const { _id, module_loading, title } = module || {};

  const clickDelete = (e: MouseEvent<HTMLButtonElement>) => delete_module(_id);

  const close = (e: MouseEvent<HTMLButtonElement>) => toggle_modal();

  return (
    <>
      <div className='modal__set-title'>
        <h2>{title}</h2>
      </div>

      <div className='modal__warning'>
        <p>
          You are about to delete this set and all of its data. You won't be able to
          access this set ever again.
        </p>
      </div>

      <div className='modal__question'>
        <p>Are you absolutely positive? There's no undo.</p>
      </div>

      <div className='modal__choice'>
        <div className='modal__choice-item'>
          <button
            className='btn width100 bcc-mudblue pad15-30 brr15 fz175 white h-opacity09'
            onClick={close}
          >
            Cancel
          </button>
        </div>

        <div className='modal__choice-item'>
          <LoadingButton
            active={true}
            loading={module_loading}
            onClickHandler={clickDelete}
            classStr='btn width100 bcc-coral pad15-30 brr15 fz175 white h-opacity09'
          >
            Yes, delete set
          </LoadingButton>
        </div>
      </div>
    </>
  );
};

export default Delete;
