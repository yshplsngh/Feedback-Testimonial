import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Input from '../ui/components/Input';
import Button from '../ui/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FeedbackSchema, FeedbackType, FeedbackTypeWSAS } from './types';
import Stars from './components/Stars';
import { useEffect, useState } from 'react';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  getExtraFormInfo,
  getFeedbackFormInfo,
  submitFeedback,
} from './feedbackSlice';
import { AppDispatch } from '../app/store';
import { toast } from 'sonner';
import { FetchResponseError } from '../lib/manageFetch/api';
import NotFound from '../pages/NotFound';

const Feedback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { question, customMessage } = useSelector(getExtraFormInfo);
  const { spaceName } = useParams<{ spaceName?: string }>();
  const [stars, setStars] = useState<number>(3);
  const dispatch: AppDispatch = useDispatch();

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

  if (spaceName === undefined) {
    return <NotFound message={'Error: Space Name Is Missing!'} />;
  }

  const onSubmit: SubmitHandler<FeedbackType> = async (data: FeedbackType) => {
    const feedbackSchemaWithStars: FeedbackTypeWSAS = {
      ...data,
      stars,
      spaceName,
    };
    if (isValid) {
      setBtnLoading(true);
      try {
        await dispatch(submitFeedback(feedbackSchemaWithStars)).unwrap();
        toast.success('Thank you for giving feedback');
        reset();
        setStars(3);
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while sending feedback';
        toast.error(errorMessage);
      } finally {
        setBtnLoading(false);
      }
    }
  };

  return !loading ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: 'spring',
      }}
    >
      <section className="flex items-center justify-center text-black transition-all">
        <main className="mx-auto my-10 w-full max-w-2xl space-y-6 rounded-lg bg-white px-12 py-12">
          <p className={'text-sm text-gray-700'}>Write text feedback to</p>
          <span className={'text-orange text-4xl font-bold'}>{spaceName}</span>

          <div className={'text-lg text-black'}>{customMessage}</div>
          <div className={'flex text-black'}>
            Q:&nbsp;<p className={'text-gray-600'}>{question}</p>
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
