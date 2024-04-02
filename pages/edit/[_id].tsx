import ModuleEdit from '@modules/Edit';
import ScrollTop from '@modules/ScrollTop';

interface OwnProps {}

type Props = OwnProps;

const Edit: React.FC<Props> = () => {
  return (
    <>
      <ModuleEdit />
      <ScrollTop />
    </>
  );
};

export default Edit;
