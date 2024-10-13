import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useEffect, useState } from 'react';
import { selectAllSpaces } from '../spaceSlice';
import { FetchResponseError } from '../../lib/manageFetch/api';
import { toast } from 'sonner';
import { getUserSpaces } from '../spaceApi';
import Button from '../../ui/components/Button';
import { SquarePlus, LayoutDashboard } from 'lucide-react';
import DashboardCard from './DashboardCard';
import LoLoadingSpinner from '../../ui/components/LoLoadingSpinner';
import { motion } from 'framer-motion';

const Dashboard = ({ nextStep }: { nextStep: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const spaces = useSelector(selectAllSpaces);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuToggle, setMenuToggle] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSpaces() {
      setLoading(true);
      try {
        await dispatch(getUserSpaces()).unwrap();
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while fetching spaces';
        toast.error(errorMessage);
      }
    }

    fetchSpaces().then(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full">
        <div className="flex flex-row items-center justify-between px-2 py-3 md:px-5 md:py-6">
          <h1 className="flex items-center text-2xl font-semibold md:text-3xl">
            Dashboard <LayoutDashboard className={'ml-3 h-6 w-6'} />
          </h1>
          <Button
            type={'button'}
            variant={'secondary'}
            text={`Create New Space`}
            icon={<SquarePlus className={'h-4 w-4'} />}
            onClick={() => nextStep()}
            className={'max-w-fit'}
          />
        </div>
        <hr className={'border-accent'} />
        <div className="mx-2 mt-10 grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {spaces && spaces.length > 0 ? (
            spaces.map((space, index) => (
              <DashboardCard
                key={index}
                menuStatus={index === menuToggle}
                spaceName={space.spaceName}
                feedbackCount={space.feedbackCount}
                menuToggle={() => {
                  if (menuToggle !== index) {
                    setMenuToggle(index);
                  } else {
                    setMenuToggle(null);
                  }
                }}
              />
            ))
          ) : (
            <div className="mx-auto flex flex-col justify-center gap-y-3">
              <div className="mt-3 w-full text-center">No projects found!</div>
              <Button
                type={'button'}
                variant={'secondary'}
                text={`create Project`}
                icon={<SquarePlus className={'h-4 w-4'} />}
                onClick={() => nextStep()}
                className={'max-w-fit'}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};

export default Dashboard;
