import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/components/Button';
import {
  SquarePen,
  MessageSquareText,
  SquareArrowOutUpRight,
  GalleryVerticalEnd,
  Heart,
  SquareCode,
  LucideIcon,
} from 'lucide-react';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/components/RadixAvatar';
import NotFound from '../pages/NotFound';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { selectFeedbacksBySpaceId } from '../feedback/feedbackSlice';
import { getUserSpace } from './spaceApi';
import { FetchResponseError } from '../lib/manageFetch/api';
import { selectSpaceBySpaceName } from './spaceSlice';
import { getFeedbacks } from '../feedback/feedbackApi';
import FeedbackBox from './component/FeedbackBox';

const ManageSpace: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const tabOptions = {
    All: GalleryVerticalEnd,
    Favorite: Heart,
    'Feedback Widget': SquareCode,
  };
  type TabOption = keyof typeof tabOptions;

  const [activeTab, setActiveTab] = useState<TabOption>('All');
  const [loading, setLoading] = useState<boolean>(false);

  const { spaceName: rawSpaceName } = useParams<{ spaceName?: string }>();
  const spaceName = rawSpaceName?.toLowerCase();
  const space = useSelector((state: RootState) =>
    selectSpaceBySpaceName(state, spaceName),
  );
  const feedbacks = useSelector((state: RootState) =>
    selectFeedbacksBySpaceId(state, space?.id),
  );

  const RenderActiveWindow = () => {
    const favoriteFeedback = feedbacks.filter((feedback) => feedback.favorite);
    switch (activeTab) {
      case 'All':
        return <FeedbackBox feedbacks={feedbacks} />;
      case 'Favorite':
        return <FeedbackBox feedbacks={favoriteFeedback} />;
      case 'Feedback Widget':
        return <h1>Feedback Widget</h1>;
    }
  };

  const activeWindow = RenderActiveWindow();

  useEffect(() => {
    async function fetchData() {
      if (spaceName === undefined) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        if (space === undefined) {
          await dispatch(getUserSpace(spaceName)).unwrap();
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
      transition={{ duration: 0.5 }}
    >
      <div className="w-full">
        <div className="flex flex-row items-center justify-between px-2 py-2 transition-all md:px-5 md:py-4">
          <div className={'flex items-center space-x-5'}>
            <Avatar className="h-11 w-11 rounded-md md:h-14 md:w-14">
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
              <span className="flex items-center text-[1.2rem] font-semibold capitalize md:text-2xl">
                {spaceName?.toLowerCase()}
              </span>
              <Link
                to={
                  import.meta.env.VITE_ENV === 'development'
                    ? `http://localhost:3000/feedback/${spaceName}`
                    : `https://testimonial.yshplsngh.in/feedback/${spaceName}`
                }
                target={'_blank'}
                className={'feedback-url text-[0.8rem] text-gray-300'}
              >
                <span className="hidden items-center space-x-1 md:flex">
                  Public URL :
                  <p className={'underline'}>
                    {import.meta.env.VITE_ENV === 'development'
                      ? `http://localhost:3000/feedback/${spaceName}`
                      : `https://testimonial.yshplsngh.in/feedback/${spaceName}`}
                  </p>
                  <SquareArrowOutUpRight className={'h-3 w-3'} />
                </span>
                <span className="flex items-center space-x-1 align-middle text-[0.95rem] md:hidden">
                  <small>Go to Feedback Page</small>{' '}
                  <SquareArrowOutUpRight className={'h-3 w-3'} />
                </span>
              </Link>
            </div>
          </div>
          <div className={'flex flex-row items-center md:gap-x-5 md:gap-y-3'}>
            <span className={'hidden items-center space-x-1 md:flex'}>
              <MessageSquareText className={'h-4 w-4'} />
              <p>Feedbacks: {space?.feedbackCount}</p>
            </span>
            <Button
              type={'button'}
              variant={'secondary'}
              text={`Edit Space`}
              icon={<SquarePen className={'h-4 w-4'} />}
              className={'max-w-fit'}
              onClick={() => navigate(`/space/edit/${spaceName}`)}
            />
          </div>
        </div>
        <hr className={'border-accent'} />
        <div
          className={
            'mt-10 flex w-full flex-col gap-x-3 gap-y-10 px-2 md:flex-row md:px-8'
          }
        >
          <div className={'sidebar flex w-full flex-col gap-y-2 md:w-3/12'}>
            <span className={'text-lg font-semibold text-gray-300'}>Inbox</span>
            <div className={'pl1 flex flex-col gap-y-2'}>
              {(Object.entries(tabOptions) as [TabOption, LucideIcon][]).map(
                ([tabOption, Icon]) => (
                  <Button
                    key={tabOption}
                    type={'button'}
                    variant={'outlineB'}
                    text={tabOption}
                    icon={<Icon className={'h-5 w-5'} />}
                    className={`text-md h-10 justify-start border-none ${activeTab === tabOption ? 'bg-accent' : 'bg-transparent'}`}
                    onClick={() => setActiveTab(tabOption)}
                  />
                ),
              )}
            </div>
          </div>
          <div
            className={'feedbacks grid w-full grid-cols-1 gap-y-5 md:w-9/12'}
          >
            {activeWindow}
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};
export default ManageSpace;
