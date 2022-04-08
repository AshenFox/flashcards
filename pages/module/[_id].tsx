import Spinner from '../../components/main/Spinner';
import Modal from '../../components/modal/Modal';
import ModuleContainer from '../../components/module/ModuleContainer';
import ScrollTop from '../../components/main/ScrollTop';

interface OwnProps {}

type Props = OwnProps;

const Module: React.FC<Props> = () => {
  return (
    <>
      <ModuleContainer />
      <Spinner />
      <ScrollTop />
      <Modal />
    </>
  );
};

export default Module;
