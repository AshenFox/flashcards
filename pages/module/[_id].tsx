import Modal from '../../components/modal/Modal';
import ModuleContainer from '../../components/module/ModuleContainer';
import ScrollTop from '@modules/ScrollTop';

interface OwnProps {}

type Props = OwnProps;

const Module: React.FC<Props> = () => {
  return (
    <>
      <ModuleContainer />
      <ScrollTop />
      <Modal />
    </>
  );
};

export default Module;
