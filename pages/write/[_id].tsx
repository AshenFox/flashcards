import Spinner from '../../components/main/Spinner';
import WriteContainer from '../../components/write/WriteContainer';

interface OwnProps {}

type Props = OwnProps;

const Write: React.FC<Props> = () => {
  return (
    <>
      <WriteContainer />
      <Spinner />
    </>
  );
};

export default Write;
