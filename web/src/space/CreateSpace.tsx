import { SubmitHandler, useForm } from 'react-hook-form';
import { NewSpaceScheme, NewSpaceType } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getSpaceLoading } from './spaceSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FetchResponseError } from '../lib/manageFetch/api';
import { SquarePlus } from 'lucide-react';
import { createNewSpace } from './spaceApi';
import { motion } from 'framer-motion';

const CreateSpace = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getSpaceLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NewSpaceType>({ resolver: zodResolver(NewSpaceScheme) });

  const watchedSpaceName = watch('spaceName');
  const publicSpaceName = watchedSpaceName
    ? NewSpaceScheme.shape.spaceName.parse(watchedSpaceName)
    : '';

  const onSubmit: SubmitHandler<NewSpaceType> = async (data: NewSpaceType) => {
    if (isValid) {
      try {
        await dispatch(createNewSpace(data)).unwrap();
        toast.success('New space created successfully');
        navigate('/dashboard');
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while creating the space.';
        toast.error(errorMessage);
      }
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
          <h1 className="mb-14 text-center text-2xl font-bold text-gray-800">
            New Space
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <Input
              inputName={'spaceName'}
              inputError={errors.spaceName}
              register={register}
              publicSpaceName={publicSpaceName}
            />
            <Input
              inputName={'websiteUrl'}
              inputError={errors.websiteUrl}
              register={register}
            />
            <Input
              inputName={'headerTitle'}
              inputError={errors.headerTitle}
              register={register}
            />
            <Input
              inputName={'customMessage'}
              inputError={errors.customMessage}
              register={register}
            />
            <Input
              inputName={'question'}
              inputError={errors.question}
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

export default CreateSpace;
