import { useRouter } from 'next/router';
import Link from 'next/link';
import ContentWrapper from '@components/ContentWrapper';
import { useAppSelector } from '../../../store/hooks';
import { memo } from 'react';
import Container from '@components/Container';

const EditIntro = () => {
  const router = useRouter();

  const { _id } = router.query;

  const { module } = useAppSelector(({ main }) => main);

  const { draft } = module || {};

  return (
    <div className='edit__intro'>
      <ContentWrapper tagType='section'>
        <Container>
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
        </Container>
      </ContentWrapper>
    </div>
  );
};

export default memo(EditIntro);
