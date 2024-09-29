import { useNavigate } from 'react-router-dom';

type PropsType = {
  id: number;
  spaceName: string;
  headerTitle: string;
};
const DashboardCards = ({ spaceName, headerTitle }: PropsType) => {
  const navigate = useNavigate();
  const feedbackUrl = `http://localhost:3000/feedback/${spaceName}`;
  return (
    <div
      // onClick={() => navigate(`/dashboard/space/${spaceName}`)}
      onClick={() => navigate(`/feedback/${spaceName}`)}
      className="border-accent hover:bg-accent mx-auto flex w-full cursor-pointer flex-col gap-y-2 overflow-hidden rounded-md border-[2px] px-4 py-3 transition-all ease-in-out md:mx-0 md:max-w-96"
    >
      <div className="block text-lg font-semibold">{spaceName}</div>
      <hr className={'border-gray-500'} />
      <p className={'text-sm text-gray-100'}>
        {headerTitle.length > 35
          ? `${headerTitle.slice(0, 35)}...`
          : headerTitle}
      </p>
      <p className="text-xs font-light text-blue-500">
        {feedbackUrl.length > 45
          ? `${feedbackUrl.substring(0, 45)}...`
          : feedbackUrl}
      </p>
    </div>
  );
};
export default DashboardCards;
