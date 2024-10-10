import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/components/Button';
import { List } from 'lucide-react';
import { toast } from 'sonner';

type PropsType = {
  spaceName: string;
  feedbackCount: number;
};
const DashboardCard = ({ spaceName, feedbackCount }: PropsType) => {
  const navigate = useNavigate();
  const feedbackUrl = `http://localhost:3000/feedback/${spaceName}`;
  return (
    <div className="border-accent mx-auto flex w-full max-w-[22rem] flex-col gap-y-2 overflow-hidden rounded-md border-[2px] px-4 py-3 transition-all ease-in-out">
      <div className={'flex flex-row justify-between'}>
        <div
          className="cursor-pointer text-xl font-semibold capitalize hover:text-gray-300 hover:underline"
          onClick={() => navigate(`/space/${spaceName}`)}
        >
          {spaceName}
        </div>
        <Button
          type={'button'}
          variant={'secondary'}
          className={
            'w-fit rounded-full bg-transparent p-1 hover:bg-transparent'
          }
          icon={<List className={'h-4 w-4 text-white hover:text-gray-300'} />}
          onClick={() => toast.info('feature not implemented yet!')}
        />
      </div>
      <p className={'text-sm text-gray-300'}>
        Total Feedbacks: {feedbackCount}
      </p>
      <hr className={'border-gray-500'} />
      <Link
        to={feedbackUrl}
        target={'_blank'}
        className="cursor-pointer text-sm font-light text-blue-500 hover:underline"
      >
        {feedbackUrl.length > 45
          ? `${feedbackUrl.substring(0, 45)}...`
          : feedbackUrl}
      </Link>
    </div>
  );
};
export default DashboardCard;
