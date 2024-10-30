import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Input from '../../ui/components/Input';
import Button from '../../ui/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FeedbackSchema, FeedbackType, FeedbackTypeWSAS } from '../types';
import Stars from './Stars';
import { useEffect, useState } from 'react';
import LoLoadingSpinner from '../../ui/components/LoLoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getExtraFormInfo } from '../feedbackSlice';
import { AppDispatch } from '../../app/store';
import { toast } from 'sonner';
import { FetchResponseError } from '../../lib/manageFetch/api';
import NotFound from '../../pages/NotFound';
import { getFeedbackFormInfo, submitFeedback } from '../feedbackApi';

const Feedback = ({ onNext }: { onNext: () => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const feedbackPageInfo = useSelector(getExtraFormInfo);
  const { spaceName } = useParams<{ spaceName?: string }>();
  const [stars, setStars] = useState<number>(2);
  const dispatch: AppDispatch = useDispatch();

  const { question, customMessage } = feedbackPageInfo;
  useEffect(() => {
    async function fetchFeedbackFormInfo() {
      if (spaceName === undefined) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        await dispatch(getFeedbackFormInfo(spaceName)).unwrap();
      } catch (err) {
        console.error(err);
        navigate('/error');
      }
    }

    fetchFeedbackFormInfo().then(() => setLoading(false));
  }, [dispatch, navigate, spaceName]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FeedbackType>({ resolver: zodResolver(FeedbackSchema) });

  const onSubmit: SubmitHandler<FeedbackType> = async (data: FeedbackType) => {
    if (spaceName === undefined) {
      setLoading(false);
      return;
    }
    const feedbackSchemaWithStars: FeedbackTypeWSAS = {
      ...data,
      stars,
      spaceName,
    };
    if (isValid) {
      setBtnLoading(true);
      try {
        await dispatch(submitFeedback(feedbackSchemaWithStars)).unwrap();
        reset();
        setStars(3);
        onNext();
      } catch (err) {
        console.log(err);
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while sending feedback';
        toast.error(errorMessage);
      } finally {
        setBtnLoading(false);
      }
    }
  };

  if (
    !loading &&
    (!Object.values(feedbackPageInfo).every(Boolean) || spaceName === undefined)
  ) {
    return (
      <NotFound
        message={
          spaceName === undefined
            ? 'Error: Space Name Is Missing!'
            : 'Error: Space Not Found'
        }
      />
    );
  }

  return !loading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <section className="flex items-center justify-center text-black transition-all">
        <main className="bg-whitish mx-auto my-10 w-full max-w-2xl space-y-5 rounded-lg px-3 py-10 shadow-2xl sm:px-6 md:px-12">
          <span className={'text-orange text-lg font-bold capitalize'}>
            Write text testimonial for {spaceName}
          </span>
          <div className={'flex flex-col gap-y-2 text-gray-500'}>
            <div className={'text-black'}>{customMessage}</div>
            <div className={'flex text-black'}>
              Q:&nbsp;<p className={'text-gray-600'}>{question}</p>
            </div>
          </div>

          <Stars stars={stars} setStars={setStars} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="group relative z-0 w-full">
              <textarea
                id={'customerFeedback'}
                rows={5}
                className={`text-md block w-full appearance-none rounded-md border-2 bg-transparent px-0 py-1 text-gray-900 focus:outline-none focus:ring-0 ${errors.customerFeedback ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-600'} peer`}
                placeholder=""
                required
                {...register('customerFeedback')}
              />
              {errors.customerFeedback && (
                <p className={'text-[0.7rem] text-red-500'}>
                  {errors.customerFeedback?.message}
                </p>
              )}
            </div>
            <Input
              inputName={'name'}
              inputError={errors.name}
              register={register('name')}
            />
            <Input
              inputName={'email'}
              inputError={errors.email}
              register={register('email')}
            />
            <Button
              type={'submit'}
              text={'Send'}
              variant={'outlineB'}
              className={'h-9 text-lg'}
              icon={<Send className={'h-4 w-4'} />}
              loading={btnLoading}
            />
          </form>
        </main>
      </section>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};
export default Feedback;
