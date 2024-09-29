import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useEffect } from 'react';
import { getSpaceLoading, selectAllSpaces } from './spaceSlice';
import { FetchResponseError } from '../lib/manageFetch/api';
import { toast } from 'sonner';
import { getUserSpaces } from './spaceApi';
import { Link } from 'react-router-dom';
import Button from '../ui/components/Button';
import { SquarePlus } from 'lucide-react';
import DashboardCards from './component/DashboardCards';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const spaces = useSelector(selectAllSpaces);
  const loading = useSelector(getSpaceLoading);
  useEffect(() => {
    async function fetchSpaces() {
      try {
        await dispatch(getUserSpaces()).unwrap();
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while fetching spaces';
        toast.error(errorMessage);
      }
    }

    fetchSpaces();
  }, [dispatch]);

  if (loading) {
    return <LoLoadingSpinner />;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between px-5 py-3">
          {' '}
          <h1 className="text-xl font-semibold md:text-3xl">
            Dashboard Page 📄
          </h1>
        </div>
        <hr />
        <div className="mt-10 flex flex-wrap justify-evenly gap-y-5">
          {spaces && spaces.length > 0 ? (
            spaces.map((data, index) => (
              <DashboardCards
                key={index}
                id={data.id}
                spaceName={data.spaceName}
                headerTitle={data.headerTitle}
              />
            ))
          ) : (
            <div className="mx-auto flex flex-col justify-center gap-y-3">
              <div className="mt-3 w-full text-center">No projects found!</div>
              <Link to={'/new-space'}>
                <Button
                  type={'button'}
                  variant={'secondary'}
                  text={`create Project`}
                  icon={<SquarePlus className={'h-4 w-4'} />}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
