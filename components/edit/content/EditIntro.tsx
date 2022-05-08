import { useRouter } from 'next/router';
import Link from 'next/link';
import ContentWrapper from '../../main/ContentWrapper';
import { useAppSelector } from '../../../store/hooks';
import { FC } from 'react';

interface OwnProps {}

type Props = OwnProps;

const EditContainer: FC<Props> = () => {
  const router = useRouter();

  const { _id } = router.query;

  const { module } = useAppSelector(({ main }) => main);

  const { draft } = module || {};

  return (
    <div className='edit__intro'>
      <ContentWrapper tagType='section'>
        <div className='container'>
          <div className='edit__intro-content'>
            <div className='edit__intro-info'>
              <h2>Edit the study set! :)</h2>
            </div>
            <div className='edit__intro-return'>
              <Link href={draft ? '/home/modules' : `/module/${_id}`}>
                <button
                  className='btn bcc-lightblue pad12-30 brr15 white fz15 fw-normal h-grey h-bcc-yellow'
                  type='button'
                >
                  Return
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default EditContainer;
