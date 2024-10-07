import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/components/Button';
import { SquarePen } from 'lucide-react';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/components/RadixAvatar';
import NotFound from '../pages/NotFound';
import { toast } from 'sonner';

const ManageSpace = () => {
  const [loading] = useState(false);
  // const stars = 4;
  // const name = 'ManageSpace';
  // const email = 'admin@gmail.com';
  // const customerFeedback = 'customerFeedback';

  const { spaceName } = useParams<{ spaceName?: string }>();

  if (spaceName === undefined) {
    return <NotFound message={'Error: Space Name Is Missing!'} />;
  }

  return !loading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between px-5 py-6">
          <div className={'flex items-center space-x-5'}>
            <Avatar className="h-14 w-14 rounded-md">
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
              <span className="flex items-center text-xl font-semibold md:text-2xl">
                {spaceName}
              </span>
              <Link
                to={`http://localhost:3000/feedback/${spaceName}`}
                target={'_blank'}
                className={'text-[0.8rem] text-gray-300 underline'}
              >
                Public URL: http://localhost:3000/feedback/{spaceName}
              </Link>
            </div>
          </div>
          <Button
            type={'button'}
            variant={'secondary'}
            text={`Edit Space`}
            icon={<SquarePen className={'h-4 w-4'} />}
            className={'max-w-fit'}
            onClick={() => toast.info('service not available')}
          />
        </div>
        <hr className={'border-accent'} />

        {/*<div className="mt-10 flex flex-wrap justify-evenly gap-y-5">*/}
        {/*  {spaces && spaces.length > 0 ? (*/}
        {/*    spaces.map((data, index) => (*/}
        {/*      <DashboardCards*/}
        {/*        key={index}*/}
        {/*        spaceName={data.spaceName}*/}
        {/*        feedbackCount={data.feedbackCount}*/}
        {/*      />*/}
        {/*    ))*/}
        {/*  ) : (*/}
        {/*    <div className="mx-auto flex flex-col justify-center gap-y-3">*/}
        {/*      <div className="mt-3 w-full text-center">No projects found!</div>*/}
        {/*      <Button*/}
        {/*        type={'button'}*/}
        {/*        variant={'secondary'}*/}
        {/*        text={`create Project`}*/}
        {/*        icon={<SquarePlus className={'h-4 w-4'} />}*/}
        {/*        onClick={() => nextStep()}*/}
        {/*        className={'w-20'}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};
export default ManageSpace;
