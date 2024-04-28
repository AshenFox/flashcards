import Search from '@modules/Home/content/Search';
import { useRouter } from 'next/router';
import React, { memo } from 'react';
import s from './styles.module.scss';
import StudyRegime from './components/StudyRegime';
import Modules from './components/Modules';
import Cards from './components/Cards';

const Sections = () => {
  const router = useRouter();
  const { section } = router.query;

  return (
    <div className={s.content}>
      {(section === 'cards' || section === 'modules') && <Search />}

      <div>
        {section === 'cards' && <Cards />}
        {section === 'modules' && <Modules />}
        {section === 'sr' && <StudyRegime />}
      </div>
    </div>
  );
};

export default memo(Sections);
