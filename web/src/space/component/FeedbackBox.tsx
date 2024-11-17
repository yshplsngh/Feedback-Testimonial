import { BFeedbackTypeWSAS } from '../../feedback/types';
import FeedbackCard from './FeedbackCard';

const FeedbackBox = ({ feedbacks }: { feedbacks: BFeedbackTypeWSAS[] }) => {
  return (
    <>
      {feedbacks && feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedbackId={feedback.id} />
        ))
      ) : (
        <div className="mx-auto flex flex-col justify-center gap-y-3">
          <div className="mt-3 w-full text-center">No Feedback found!</div>
        </div>
      )}
    </>
  );
};
export default FeedbackBox;
