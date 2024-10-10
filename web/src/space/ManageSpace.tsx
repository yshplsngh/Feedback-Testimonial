import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/components/Button';
import { SquarePen, MessageSquareText } from 'lucide-react';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';
import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/components/RadixAvatar';
import NotFound from '../pages/NotFound';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  getFeedbacks,
  selectFeedbacksBySpaceId,
} from '../feedback/feedbackSlice';
import { getUserSpaces } from './spaceApi';
import { FetchResponseError } from '../lib/manageFetch/api';
import { selectSpaceBySpaceName } from './spaceSlice';
import FeedbackCard from './component/FeedbackCard';

const ManageSpace = () => {
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { spaceName } = useParams<{ spaceName?: string }>();
  const space = useSelector((state: RootState) =>
    selectSpaceBySpaceName(state, spaceName),
  );
  const feedbacks = useSelector((state: RootState) =>
    selectFeedbacksBySpaceId(state, space?.id),
  );

  useEffect(() => {
    async function fetchData() {
      if (spaceName === undefined) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        if (space === undefined) {
          await dispatch(getUserSpaces()).unwrap();
        }
        await dispatch(getFeedbacks(spaceName)).unwrap();
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while fetching data';
        toast.error(errorMessage);
      }
    }

    fetchData().then(() => setLoading(false));
  }, [dispatch, spaceName, space]);

  if (!loading && (space === undefined || spaceName === undefined)) {
    return (
      <NotFound
        message={
          spaceName === undefined
            ? 'Error: Space Name Is Missing!'
            : 'Error: Space Not Found'
        }
      />
    );
  }

  return !loading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between px-5 py-4">
          <div className={'flex items-center space-x-5'}>
            <Avatar className="h-14 w-14 rounded-md">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${spaceName}`}
                className={'rounded-md'}
                alt={spaceName}
              />
              <AvatarFallback className={'rounded-md bg-[#dddddd] text-black'}>
                {spaceName?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="flex items-center text-xl font-semibold capitalize md:text-2xl">
                {spaceName}
              </span>
              <Link
                to={`http://localhost:3000/feedback/${spaceName}`}
                target={'_blank'}
                className={'text-[0.8rem] text-gray-300 underline'}
              >
                Public URL: http://localhost:3000/feedback/{spaceName}
              </Link>
            </div>
          </div>
          <div className={'flex items-center space-x-5'}>
            <span className={'flex items-center space-x-1'}>
              <MessageSquareText className={'h-4 w-4'} />
              <p>Feedbacks: {space?.feedbackCount}</p>
            </span>
            <Button
              type={'button'}
              variant={'secondary'}
              text={`Edit Space`}
              icon={<SquarePen className={'h-4 w-4'} />}
              className={'max-w-fit'}
              onClick={() => toast.info('feature not implemented yet!')}
            />
          </div>
        </div>
        <hr className={'border-accent'} />

        <div>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedbackId={feedback.id}
                fspaceId={feedback.spaceId}
                spaceId={space?.id}
              />
            ))
          ) : (
            <div className="mx-auto flex flex-col justify-center gap-y-3">
              <div className="mt-3 w-full text-center">No Feedback found!</div>
            </div>
          )}
        </div>

        {/*  <div className="mt-10 flex flex-wrap justify-evenly gap-y-5">*/}
        {/*    {spaces && spaces.length > 0 ? (*/}
        {/*      spaces.map((data, index) => (*/}
        {/*        <DashboardCard*/}
        {/*          key={index}*/}
        {/*          spaceName={data.spaceName}*/}
        {/*          feedbackCount={data.feedbackCount}*/}
        {/*        />*/}
        {/*      ))*/}
        {/*    ) : (*/}
        {/*      <div className="mx-auto flex flex-col justify-center gap-y-3">*/}
        {/*        <div className="mt-3 w-full text-center">No projects found!</div>*/}
        {/*        <Button*/}
        {/*          type={'button'}*/}
        {/*          variant={'secondary'}*/}
        {/*          text={`create Project`}*/}
        {/*          icon={<SquarePlus className={'h-4 w-4'} />}*/}
        {/*          onClick={() => nextStep()}*/}
        {/*          className={'w-20'}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
      </div>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};
export default ManageSpace;
