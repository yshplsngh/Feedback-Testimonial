import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useEffect, useState } from 'react';
import { deleteRSpace, selectAllSpaces } from '../spaceSlice';
import { FetchResponseError } from '../../lib/manageFetch/api';
import { toast } from 'sonner';
import { deleteUserSpace, getUserSpaces } from '../spaceApi';
import Button from '../../ui/components/Button';
import { SquarePlus, LayoutDashboard, Trash2 } from 'lucide-react';
import DashboardCard from './DashboardCard';
import LoLoadingSpinner from '../../ui/components/LoLoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';

const Dashboard = ({ nextStep }: { nextStep: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const spaces = useSelector(selectAllSpaces);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [spaceConfirmationId, setSpaceConfirmationId] = useState<number | null>(
    null,
  );
  const [menuId, setMenuId] = useState<number | null>(null);

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

  // fn to delete space
  const onDeleteSpace = async () => {
    setDeleteLoading(true);
    try {
      if (!spaceConfirmationId) {
        alert('something wrong happen, please refresh the page');
        return;
      }
      await dispatch(deleteUserSpace(spaceConfirmationId)).unwrap();
      // delete space for redux store
      dispatch(deleteRSpace({ spaceId: spaceConfirmationId }));
      toast.success('space deleted successfully');

      // close space delete confirmation window
      setSpaceConfirmationId(null);
    } catch (err) {
      const errorMessage =
        (err as FetchResponseError).message ||
        'An error occurred while deleting the space.';
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  return !loading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={'relative'}
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
        <div className={'mt-10 flex flex-col items-center justify-center'}>
          {spaces && spaces.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
              {spaces.map((space) => (
                <DashboardCard
                  key={space.id}
                  menuStatus={space.id === menuId}
                  spaceName={space.spaceName}
                  spaceId={space.id}
                  websiteUrl={space.websiteUrl}
                  feedbackCount={space.feedbackCount}
                  menuToggle={() => {
                    if (menuId !== space.id) {
                      setMenuId(space.id);
                    } else {
                      // if menuId === space.id, mean same menu button pressed again the same card,
                      // so close menu
                      setMenuId(null);
                    }
                  }}
                  setMenuId={setMenuId}
                  setSpaceConfirmationId={setSpaceConfirmationId}
                />
              ))}
            </div>
          ) : (
            <div className="w-fit space-y-3">
              <div className="w-full border-2 border-red-500 text-center">
                No projects found !
              </div>
              <Button
                type={'button'}
                variant={'secondary'}
                text={`Create New Space`}
                icon={<SquarePlus className={'h-4 w-4'} />}
                onClick={() => nextStep()}
                className={'max-w-fit'}
              />
            </div>
          )}
        </div>
      </div>

      {/*space delete confirmation box*/}
      {/*open the confirmation box if user clicked delete button of any space*/}
      <AnimatePresence>
        {spaceConfirmationId && (
          <motion.div
            key="confirmation-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
            exit={{ opacity: 0 }}
            className="absolute top-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-sm backdrop-filter"
          >
            <div
              className={
                'bg-whitish h-fit max-w-[25rem] overflow-hidden rounded-xl text-black'
              }
            >
              <div className={'space-y-8 px-4 py-5'}>
                <div className={'space-y-3'}>
                  <div>
                    <p className={'text-lg font-semibold'}>
                      Are you sure you want to delete this space?
                    </p>
                    <p className={'text-sm text-gray-500'}>
                      This action is permanent and cannot be undone.
                    </p>
                  </div>
                  <p className={'text-sm text-red-700'}>
                    Note: All feedback of this space will also be deleted
                  </p>
                </div>
                <div className={'flex flex-row justify-end space-x-5'}>
                  <Button
                    variant={'secondary'}
                    type={'button'}
                    text={'Cancel'}
                    className={'w-fit'}
                    onClick={() => setSpaceConfirmationId(null)}
                  />
                  <Button
                    variant={'danger'}
                    type={'button'}
                    text={'Delete'}
                    className={'w-fit'}
                    onClick={() => onDeleteSpace()}
                    icon={<Trash2 className={'h-4 w-4'} />}
                    loading={deleteLoading}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};

export default Dashboard;
