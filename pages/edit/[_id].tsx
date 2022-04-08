import Spinner from '../../components/main/Spinner';
import EditContainer from '../../components/edit/EditContainer';
import ScrollTop from '../../components/main/ScrollTop';

interface OwnProps {}

type Props = OwnProps;

const Edit: React.FC<Props> = () => {
  return (
    <>
      <EditContainer />
      <Spinner />
      <ScrollTop />
    </>
  );
};

export default Edit;
