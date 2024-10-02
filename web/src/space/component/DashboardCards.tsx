import { useNavigate } from 'react-router-dom';

type PropsType = {
  id: number;
  spaceName: string;
};
const DashboardCards = ({ spaceName }: PropsType) => {
  const navigate = useNavigate();
  const feedbackUrl = `http://localhost:3000/feedback/${spaceName}`;
  return (
    <div
      // onClick={() => navigate(`/dashboard/spaces/${spaceName}`)}
      onClick={() => navigate(`/feedback/${spaceName}`)}
      className="border-accent hover:bg-accent mx-auto flex w-full cursor-pointer flex-col gap-y-2 overflow-hidden rounded-md border-[2px] px-4 py-3 transition-all ease-in-out md:mx-0 md:max-w-96"
    >
      <div className="block text-xl font-semibold">{spaceName}</div>
      <hr className={'border-gray-500'} />
      <p className="text-sm font-light text-blue-500">
        {feedbackUrl.length > 45
          ? `${feedbackUrl.substring(0, 45)}...`
          : feedbackUrl}
      </p>
    </div>
  );
};
export default DashboardCards;
