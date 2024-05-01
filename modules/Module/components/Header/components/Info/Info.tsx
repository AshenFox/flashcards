import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import SRDrop from './components/SRDrop';
import SR from './components/SR';
import DateStr from '@ui/DateStr';
import { MouseEvent, memo } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import { DeleteIcon, EditIcon } from '@ui/Icons';
import s from './styles.module.scss';
import ConfirmPopup from '@ui/ConfirmPopup';

const Info = () => {
  const { change_modal, toggle_modal, set_module_question, drop_cards_sr } = useActions();

  const currentModule = useAppSelector(s => s.main.module);

  const { author, _id, creation_date, question } = currentModule || {};

  const openModal = (value: 'delete') => (e: MouseEvent<HTMLDivElement>) => {
    change_modal(value);
    toggle_modal();
  };

  return (
    <div className={s.info}>
      <div className={s.author}>
        <span className={s.created}>
          Created <DateStr date={creation_date} /> by
        </span>
        <span className={s.nickname}>{module ? author : <Skeleton width={100} />}</span>
      </div>

      <div className={s.nav}>
        <ConfirmPopup
          className={s.confirm}
          active={question}
          setActive={set_module_question}
          onConfirm={drop_cards_sr}
          question='Drop all cards study progress?'
        />
        <SRDrop />
        <SR />
        <Link href={`/edit/${_id}`}>
          <div className={s.nav_item}>
            <EditIcon width='25' height='25' />
          </div>
        </Link>
        <div className={s.nav_item} onClick={openModal('delete')}>
          <DeleteIcon width='25' height='25' />
        </div>
      </div>
    </div>
  );
};

export default memo(Info);
