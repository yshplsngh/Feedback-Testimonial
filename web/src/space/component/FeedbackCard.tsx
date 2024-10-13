import { useDispatch, useSelector } from 'react-redux';
import {
  selectFeedbackById,
  toggleFavorite,
} from '../../feedback/feedbackSlice';
import { AppDispatch, RootState } from '../../app/store';
import Button from '../../ui/components/Button';
import { Heart, SquareArrowOutUpRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import ShowStars from './ShowStars';
import HeartLogo from '../../ui/logo/HeartLogo';
import { useState } from 'react';
import { FetchResponseError } from '../../lib/manageFetch/api';
import { toast } from 'sonner';
import { setFavoriteFeedback } from '../../feedback/feedbackApi';

const FeedbackCard = ({ feedbackId }: { feedbackId: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const feedback = useSelector((state: RootState) =>
    selectFeedbackById(state, feedbackId),
  );
  const setFavorite = async () => {
    setLoading(true);
    const beforeTransaction = feedback.favorite;
    try {
      await dispatch(setFavoriteFeedback(feedback.id)).unwrap();
      dispatch(
        toggleFavorite({
          feedbackId: feedback.id,
          explicitValue: !beforeTransaction,
        }),
      );
    } catch (err) {
      const errorMessage =
        (err as FetchResponseError).message ||
        'An error occurred while updating the favorite status.';
      toast.error(errorMessage);
      // if i got error from backend it will resave previous value
      dispatch(
        toggleFavorite({
          feedbackId: feedback.id,
          explicitValue: beforeTransaction,
        }),
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border-accent mx-auto flex w-full max-w-[46rem] flex-col space-y-4 overflow-hidden rounded-md border-[2px] px-4 py-4 shadow-xl transition-all ease-in-out">
      <div className={'flex flex-row items-center justify-between gap-y-2'}>
        <div className={'w-fit'}>
          <ShowStars stars={feedback.stars} />
        </div>
        <Button
          type={'button'}
          variant={'outlineB'}
          className={'w-fit p-1 px-2'}
          icon={
            feedback.favorite ? (
              <HeartLogo className={'h-4 w-4'} />
            ) : (
              <Heart className={'h-4 w-4 text-red-500'} />
            )
          }
          text={feedback.favorite ? 'Remove Favorite' : 'Save Favorite'}
          onClick={() => setFavorite()}
          loading={loading}
        />
      </div>
      <div className={'bg-accent rounded-md px-3 py-1'}>
        {feedback.customerFeedback}
      </div>
      <hr className={'border-gray-500'} />
      <div className={'flex flex-col text-sm'}>
        <div className={'flex w-full flex-col md:flex-row'}>
          <div className={'flex w-fit gap-x-2 capitalize md:w-1/2'}>
            <strong>Name:</strong> {feedback.name}
          </div>
          <div
            className={
              'flex w-fit items-center space-x-1 hover:cursor-pointer hover:underline md:w-1/2'
            }
          >
            <Link
              to={'#'}
              className={''}
              onClick={() =>
                (window.location.href = `mailto:${feedback.email}`)
              }
            >
              <div className={'flex w-1/2 gap-x-2'}>
                <strong>Email:</strong>
                {feedback.email}
              </div>
            </Link>
            <SquareArrowOutUpRight className={'h-3 w-3'} />
          </div>
        </div>
        <span className={'mt-2 flex gap-x-2'}>
          <strong>Submitted At:</strong>
          {format(parseISO(feedback.createdAt), 'MMM d, yyyy, h:mm:ss a')}
        </span>
      </div>
    </div>
  );
};
export default FeedbackCard;
