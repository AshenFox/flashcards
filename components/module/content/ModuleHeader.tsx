import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Study from './Study';
import Info from './Info';
import ContentWrapper from '../../main/ContentWrapper/ContentWrapper';
import { useAppSelector } from '../../../store/hooks';
import { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const ModuleContainer: FC<Props> = () => {
  const { module } = useAppSelector(({ main }) => main);

  const { title } = module || {};

  return (
    <div className='module__header'>
      <ContentWrapper tagType='section'>
        <div className='container'>
          <div className='module__header-top'>
            <div className='module__title'>
              <h1 className={`${title ? '' : 'blue'}`}>
                {module ? title ? title : '(Untitled)' : <Skeleton width={150} />}
              </h1>
            </div>
            <div className='module__return'>
              <Link href={'/home/modules'}>
                <button className='btn bcc-lightblue pad12-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'>
                  Return
                </button>
              </Link>
            </div>
          </div>
          <Study />
          <Info />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ModuleContainer;
