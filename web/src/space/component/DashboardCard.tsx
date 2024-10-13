import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/components/Button';
import {
  Copy,
  Dock,
  SquareMenu,
  SquarePen,
  TriangleAlert,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type PropsType = {
  spaceName: string;
  feedbackCount: number;
  menuStatus: boolean;
  menuToggle: () => void;
};

const DashboardCard = ({
  spaceName,
  feedbackCount,
  menuStatus,
  menuToggle,
}: PropsType) => {
  const navigate = useNavigate();
  // const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const feedbackUrl: string = `http://localhost:3000/feedback/${spaceName}`;

  return (
    <div className="border-accent mx-auto flex w-full max-w-[22rem] flex-col gap-y-2 rounded-md border-[2px] px-4 py-3 transition-all ease-in-out">
      <div className={'flex flex-row justify-between'}>
        <div
          className="cursor-pointer text-xl font-semibold capitalize hover:text-gray-300 hover:underline"
          onClick={() => navigate(`/space/${spaceName}`)}
        >
          {spaceName}
        </div>
        <div className={'relative inline-block'}>
          <div>
            <Button
              type={'button'}
              variant={'secondary'}
              className={
                'w-fit rounded-full border-none bg-transparent p-0 hover:bg-transparent md:p-0'
              }
              icon={
                menuStatus ? (
                  <X className={'h-5 w-5 text-white hover:text-gray-300'} />
                ) : (
                  <SquareMenu
                    className={'h-5 w-5 text-white hover:text-gray-300'}
                  />
                )
              }
              onClick={menuToggle}
            />
          </div>
          {menuStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              className={
                'menu border-accent absolute right-0 z-20 w-40 rounded-md border-[2px] bg-gray-950 py-1'
              }
            >
              <Button
                type={'button'}
                variant={'outlineB'}
                text={'Manage Space'}
                icon={<Dock className={'h-4 w-4'} />}
                className={
                  'hover:bg-accent justify-start rounded-none border-none bg-transparent'
                }
                onClick={() => navigate(`/space/${spaceName}`)}
              />
              <Button
                type={'button'}
                variant={'outlineB'}
                text={'Edit Space'}
                icon={<SquarePen className={'h-4 w-4'} />}
                className={`hover:bg-accent justify-start rounded-none border-none bg-transparent`}
                onClick={() => toast.info('feature not implemented yet!')}
              />
              <Button
                type={'button'}
                variant={'outlineB'}
                text={'Copy link'}
                icon={<Copy className={'h-4 w-4'} />}
                className={`hover:bg-accent justify-start rounded-none border-none bg-transparent`}
                onClick={() =>
                  toast.success('Feedback page link copy to clipboard')
                }
              />
              <Button
                type={'button'}
                variant={'danger'}
                text={'Delete Space'}
                icon={<TriangleAlert className={'h-4 w-4'} />}
                className={`justify-start rounded-none border-none bg-transparent`}
                onClick={() => toast.info('feature not implemented yet!')}
              />
            </motion.div>
          )}
        </div>
      </div>
      <p className={'text-sm text-gray-300'}>
        Total Feedbacks: {feedbackCount}
      </p>
      <hr className={'border-gray-500'} />
      <Link
        to={feedbackUrl}
        target={'_blank'}
        className="w-fit cursor-pointer text-sm font-light text-blue-500 hover:underline"
      >
        {feedbackUrl.length > 45
          ? `${feedbackUrl.substring(0, 45)}...`
          : feedbackUrl}
      </Link>
    </div>
  );
};
export default DashboardCard;
