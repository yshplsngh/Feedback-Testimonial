import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../ui/components/Input';
import Button from '../ui/components/Button';
import { SquarePlus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FeedbackSchema, FeedbackType } from './types';

const Feedback = () => {
  const params = useParams();
  console.log(params);
  const loading = false;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FeedbackType>({ resolver: zodResolver(FeedbackSchema) });

  const onSubmit: SubmitHandler<FeedbackType> = async (data: FeedbackType) => {
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
      <section className="flex items-center justify-center transition-all">
        <main className="mx-auto my-10 w-full max-w-2xl space-y-6 rounded-lg bg-white px-12 py-12 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <Input
              inputName={'name'}
              inputError={errors.name}
              register={register}
            />
            <Input
              inputName={'email'}
              inputError={errors.email}
              register={register}
            />
            <Button
              type={'submit'}
              text={'Create Space'}
              icon={<SquarePlus className={'h-4 w-4'} />}
              variant={'outlineB'}
              className={'w-full text-lg'}
              loading={loading}
            />
          </form>
        </main>
      </section>
    </motion.div>
  );
};
export default Feedback;
