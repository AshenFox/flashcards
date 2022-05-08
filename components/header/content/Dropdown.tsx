import {
  FC,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
  CSSProperties,
} from 'react';
import { useRouter } from 'next/router';
import { set_dropdown } from '../../../store/actions/headerActions';
import Link from 'next/link';
import { useActions, useAppSelector } from '../../../store/hooks';

interface OwnProps {}

type Props = OwnProps;

const Dropdown: FC<Props> = () => {
  const {
    log_out,
    set_flashcards_shuffled,
    sort_flashcards,
    shuffle_flashcards,
    reset_flashcards_progress,
    prepare_write,
  } = useActions();

  const {
    game: {
      flashcards: { shuffled },
    },
    header: { dropdown_active },
    dimen: { header_height },
  } = useAppSelector((state) => state);

  const router = useRouter();
  const { _id } = router.query;

  const isSR = _id === 'sr';

  const isFlashcards = router.pathname === '/flashcards/[_id]',
    isWrite = router.pathname === '/write/[_id]';

  const deactivateDropdown = useRef((e: MouseEvent) => {
    let menuEl = (e.target as HTMLElement).closest('.header__menu');
    let menuItemEl = (e.target as HTMLElement).closest('.header__menu-item');

    if (menuEl) {
      if (menuItemEl) set_dropdown(false);
    } else {
      set_dropdown(false);
    }
  });

  useEffect(() => {
    setTimeout(
      () =>
        dropdown_active
          ? window.addEventListener('click', deactivateDropdown.current)
          : window.removeEventListener('click', deactivateDropdown.current),
      0
    );
    return () => window.removeEventListener('click', deactivateDropdown.current);
  }, [dropdown_active]);

  const clickSuffle = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (shuffled) {
      sort_flashcards();
      set_flashcards_shuffled(false);
    } else {
      shuffle_flashcards();
      set_flashcards_shuffled(true);
    }

    reset_flashcards_progress();
  };

  const clickStartOver = (e: ReactMouseEvent<HTMLDivElement>) => prepare_write();

  const logOut = (e: ReactMouseEvent<HTMLDivElement>) => log_out();

  const stylesHeader: CSSProperties = { paddingTop: `${header_height}px` };

  return (
    <div
      className={`header__menu ${dropdown_active ? 'header__menu--active' : ''} ${
        isFlashcards || isWrite ? 'hidden__media-min-tablet' : 'hidden__media-min-mobile'
      }`}
      style={stylesHeader}
    >
      {router.asPath !== '/edit/draft' && (
        <div className='header__menu-item'>
          <Link href='/edit/draft'>
            <button className='btn fz15'>
              <svg width='20' height='20'>
                <use href='../img/sprite.svg#icon__new_module'></use>
              </svg>
              <span>Create new module</span>
            </button>
          </Link>
        </div>
      )}

      <div className='header__menu-item' onClick={logOut}>
        <button className='btn fz15'>
          <span>Log out</span>
        </button>
      </div>
      {(isFlashcards || isWrite) && !isSR && (
        <div className='header__menu-devider'>
          <span>Options:</span>
        </div>
      )}
      {isFlashcards && !isSR && (
        <>
          <div
            className={`header__menu-item ${shuffled ? 'active' : ''}`}
            onClick={clickSuffle}
          >
            <button className='btn fz15'>
              <svg width='20' height='20'>
                <use href='../img/sprite.svg#icon__shuffle'></use>
              </svg>
              <span>Shuffle</span>
            </button>
          </div>
        </>
      )}
      {isWrite && !isSR && (
        <>
          <div className={`header__menu-item caution`} onClick={clickStartOver}>
            <button className='btn fz15'>
              <span>Start over</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
