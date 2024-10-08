import { useSelector } from 'react-redux';
import { selectFeedbackById } from '../../feedback/feedbackSlice';
import { RootState } from '../../app/store';
import Button from '../../ui/components/Button';
import { Heart, SquareArrowOutUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import ShowStars from './ShowStars';

const FeedbackCard = ({ feedbackId }: { feedbackId: number }) => {
  const feedback = useSelector((state: RootState) =>
    selectFeedbackById(state, feedbackId),
  );
  return (
    <div className="border-accent mx-auto flex w-full max-w-[40rem] flex-col space-y-4 overflow-hidden rounded-md border-[2px] px-4 py-4 transition-all ease-in-out">
      <div className={'flex flex-row items-center justify-between gap-y-2'}>
        <div className={'w-fit'}>
          <ShowStars stars={feedback.stars} />
        </div>
        <Button
          type={'button'}
          variant={'secondary'}
          className={'w-fit p-1 px-2'}
          icon={<Heart className={'h-4 w-4'} />}
          text={'Add to favorite'}
          onClick={() => toast.info('feature not implemented yet!')}
          loading={false}
        />
      </div>
      <div className={'bg-accent rounded-md px-3 py-1'}>
        {feedback.customerFeedback}
      </div>
      <hr className={'border-gray-500'} />
      <div className={'flex flex-col text-sm'}>
        <div className={'flex flex-col md:flex-row'}>
          <div className={'flex w-1/2 gap-x-2 capitalize'}>
            <span className={'font-semibold'}>Name:</span> {feedback.name}
          </div>
          <div
            className={
              'flex items-center space-x-1 hover:cursor-pointer hover:underline'
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
          <span className={'font-semibold'}>Submitted At:</span>{' '}
          {format(parseISO(feedback.createdAt), 'MMM d, yyyy, h:mm:ss a')}
        </span>
      </div>
    </div>
  );
};
export default FeedbackCard;
