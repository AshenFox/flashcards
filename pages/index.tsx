import StartContainer from '../components/start/StartContainer';
import Modal from '../components/modal/Modal';
import Spinner from '../components/main/Spinner';

interface OwnProps {}

type Props = OwnProps;

const Start: React.FC<Props> = () => {
  return (
    <>
      <StartContainer />
      <Modal />
      <Spinner />
    </>
  );
};

export default Start;
