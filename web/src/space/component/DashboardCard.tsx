import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/components/Button';
import {
  Copy,
  Dock,
  SquareArrowOutUpRight,
  SquareMenu,
  SquarePen,
  TriangleAlert,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { WEB_URL } from '../../lib/manageFetch/api';

type PropsType = {
  spaceName: string;
  feedbackCount: number;
  menuStatus: boolean;
  spaceId: number;
  menuToggle: () => void;
  setSpaceConfirmationId: (spaceId: number | null) => void;
  setMenuId: (dashboardCardId: number | null) => void;
  websiteUrl: string;
};

const DashboardCard = ({
  spaceName,
  feedbackCount,
  menuStatus,
  menuToggle,
  spaceId,
  setSpaceConfirmationId,
  setMenuId,
  websiteUrl,
}: PropsType) => {
  const navigate = useNavigate();
  const feedbackUrl: string = `${WEB_URL}/feedback/${spaceName}`;

  return (
    <div className="border-accent mx-auto flex w-[23rem] flex-col rounded-md border-[2px] px-4 py-3 transition-all md:w-[22rem] lg:w-[21rem]">
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
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: menuStatus ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuStatus ? (
                    <X className={'h-5 w-5 text-white hover:text-gray-300'} />
                  ) : (
                    <SquareMenu
                      className={'h-5 w-5 text-white hover:text-gray-300'}
                    />
                  )}
                </motion.div>
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
                'menu border-accent bg-secondary-dark absolute right-0 z-20 rounded-lg border-[2px] p-2'
              }
            >
              <Button
                type={'button'}
                variant={'outlineB'}
                text={'Manage Space'}
                icon={<Dock className={'h-4 w-4'} />}
                className={
                  'hover:bg-accent justify-start border-none bg-transparent'
                }
                onClick={() => navigate(`/space/${spaceName}`)}
              />
              <Button
                type={'button'}
                variant={'outlineB'}
                text={'Edit Space'}
                icon={<SquarePen className={'h-4 w-4'} />}
                className={`hover:bg-accent justify-start border-none bg-transparent`}
                onClick={() => navigate(`/space/edit/${spaceName}`)}
              />
              <Button
                type={'button'}
                variant={'outlineB'}
                text={'Copy link'}
                icon={<Copy className={'h-4 w-4'} />}
                className={`hover:bg-accent justify-start border-none bg-transparent`}
                onClick={async () => {
                  await navigator.clipboard.writeText(feedbackUrl);
                  // set menuId to null, after copying link
                  setMenuId(null);
                  toast.success('Feedback page link copy to clipboard');
                }}
              />
              <Button
                type={'button'}
                variant={'danger'}
                text={'Delete Space'}
                icon={<TriangleAlert className={'h-4 w-4'} />}
                className={`justify-start border-none bg-transparent`}
                onClick={() => {
                  // set space id to delete
                  setSpaceConfirmationId(spaceId);
                  // set menuId to null, coz confirmation window is open so this menu
                  setMenuId(null);
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
      <p className={'text-sm text-gray-300'}>{websiteUrl}</p>
      <hr className={'my-2 border-gray-500'} />
      <div className={'flex items-center justify-between align-middle'}>
        <p className={'text-sm text-gray-300'}>
          Total Feedbacks: {feedbackCount}
        </p>
        <Link
          to={`${WEB_URL}/feedback/${spaceName}`}
          target={'_blank'}
          className={'feedback-url text-sm font-light text-blue-400'}
        >
          <span className="flex items-center space-x-1">
            <strong>Go to Feedback Page</strong>{' '}
            <SquareArrowOutUpRight className={'h-3 w-3'} />
          </span>
        </Link>
      </div>
    </div>
  );
};
export default DashboardCard;
