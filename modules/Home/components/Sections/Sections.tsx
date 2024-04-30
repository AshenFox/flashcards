import { useRouter } from 'next/router';
import React, { memo } from 'react';
import s from './styles.module.scss';
import StudyRegime from './components/sections/StudyRegime';
import Modules from './components/sections/Modules';
import Cards from './components/sections/Cards';

const Sections = () => {
  const router = useRouter();
  const { section } = router.query;

  return (
    <div className={s.content}>
      <div>
        {section === 'cards' && <Cards />}
        {section === 'modules' && <Modules />}
        {section === 'sr' && <StudyRegime />}
      </div>
    </div>
  );
};

export default memo(Sections);
