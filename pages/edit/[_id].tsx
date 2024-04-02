import EditContainer from '../../components/edit/EditContainer';
import ScrollTop from '@modules/ScrollTop';

interface OwnProps {}

type Props = OwnProps;

const Edit: React.FC<Props> = () => {
  return (
    <>
      <EditContainer />
      <ScrollTop />
    </>
  );
};

export default Edit;
