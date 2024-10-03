import { useParams } from 'react-router-dom';

const ManageSpace = () => {
  const params = useParams();
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <h1 className={'text-orange flex text-2xl'}>
        All feedback for
        <p className={'font-semibold underline'}>
          &nbsp;{params.spaceName}&nbsp;
        </p>{' '}
        will be available soon...
      </h1>
    </div>
  );
};
export default ManageSpace;
