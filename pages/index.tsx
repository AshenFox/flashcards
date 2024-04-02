import StartContainer from '../components/start/StartContainer';
import Modal from '../components/modal/Modal';

interface OwnProps {}

type Props = OwnProps;

const Start: React.FC<Props> = () => {
  return (
    <>
      <StartContainer />
      <Modal />
    </>
  );
};

export default Start;
