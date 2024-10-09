const FeedbackCard = ({
  feedbackId,
  fspaceId,
  spaceId,
}: {
  feedbackId: number;
  fspaceId: number;
  spaceId?: number;
}) => {
  return (
    <div className="border-2 border-red-500">
      <span>spaceId: {spaceId}</span>
      <h1>feedback space id: {fspaceId}</h1>
      <h1>feedback id: {feedbackId}</h1>
    </div>
  );
};
export default FeedbackCard;
