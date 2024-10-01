import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../ui/components/Input';
import Button from '../ui/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FeedbackSchema, FeedbackType } from './types';
import Stars from './components/Stars';
import { useState } from 'react';

const Feedback = () => {
  const navigate = useNavigate();
  const params = useParams();
  const spaceName = params.spaceName || '';
  const [stars, setStars] = useState<number>(2);

  // const loading = false;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FeedbackType>({ resolver: zodResolver(FeedbackSchema) });

  const onSubmit: SubmitHandler<FeedbackType> = async (data: FeedbackType) => {
    console.log({ ...data, stars });
    if (isValid) {
      console.log(data);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.3,
        type: 'spring',
      }}
    >
      <section className="flex items-center justify-center text-black transition-all">
        <main className="mx-auto my-10 w-full max-w-2xl space-y-6 rounded-lg bg-white px-12 py-12">
          <p className={'text-sm text-gray-700'}>Write text testimonial to</p>
          <span className={'text-orange text-3xl font-bold'}>{spaceName}</span>

          <div className={'text-gray-600'}>
            Q: what one thing you like about my website
          </div>

          <Stars stars={stars} setStars={setStars} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
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
            <div className={'flex justify-end gap-x-4 pr-5'}>
              <Button
                type={'button'}
                onClick={() => navigate('/')}
                text={'cancel'}
                variant={'danger'}
                className={'max-w-24 text-lg'}
              />
              <Button
                type={'submit'}
                text={'Send'}
                variant={'outlineB'}
                className={'max-w-24 text-lg'}
              />
            </div>
          </form>
        </main>
      </section>
    </motion.div>
  );
};
export default Feedback;
