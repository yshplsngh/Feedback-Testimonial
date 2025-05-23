import Button from '../../ui/components/Button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WEB_NAME, WEB_URL } from '../../lib/manageFetch/api';

const ThankYouPage = ({ startStep }: { startStep: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
      className="mt-32 flex items-center justify-center"
    >
      <div
        className={'bg-whitish w-[28rem] overflow-hidden rounded-xl text-black'}
      >
        <div className={'space-y-10 px-6 py-7'}>
          <div className={'space-y-1'}>
            <h1 className={'text-2xl font-semibold capitalize'}>
              Thank you for your feedback! 🎉
            </h1>
            <p className={'text-sm text-gray-700'}>
              If you have more to share, please do not hesitate to click again.
            </p>
          </div>
          <Button
            variant={'secondary'}
            type={'button'}
            text={'Cancel'}
            onClick={() => startStep()}
          />
        </div>
        <p
          className={
            'flex h-fit flex-row items-center justify-center gap-x-1 bg-zinc-200 py-1 text-[0.750rem] text-gray-500'
          }
        >
          Powered by
          <Link
            to={WEB_URL}
            target={'_blank'}
            className={'text-gray-700 hover:underline'}
          >
            {WEB_NAME}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
export default ThankYouPage;
