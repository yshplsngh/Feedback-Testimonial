import { SubmitHandler, useForm } from 'react-hook-form';
import { NewSpaceScheme, NewSpaceType } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../ui/components/Button';
import Input from '../../ui/components/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { toast } from 'sonner';
import { FetchResponseError } from '../../lib/manageFetch/api';
import { SquarePlus, ArrowLeft } from 'lucide-react';
import { createNewSpace } from '../spaceApi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CreateSpace = ({
  prevStep,
  startStep,
}: {
  prevStep: () => void;
  startStep: () => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NewSpaceType>({ resolver: zodResolver(NewSpaceScheme) });

  const getParsedValue = <T extends keyof NewSpaceType>(field: T) => {
    const watchField = watch(field);
    return watchField ? NewSpaceScheme.shape[field].parse(watchField) : '';
  };
  const publicSpaceName = getParsedValue('spaceName');

  const onSubmit: SubmitHandler<NewSpaceType> = async (data: NewSpaceType) => {
    if (isValid) {
      setLoading(true);
      try {
        await dispatch(createNewSpace(data)).unwrap();
        toast.success('New space created successfully');
        startStep();
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while creating the space.';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: 'spring',
      }}
    >
      <section className="flex items-center justify-center transition-all">
        <div className="bg-whitish relative mx-auto my-10 w-full max-w-[40rem] rounded-lg px-3 py-10 text-gray-800 shadow-2xl sm:px-6 md:flex md:px-12">
          <span className={'absolute left-2 top-2'}>
            <Button
              type={'button'}
              variant={'secondary'}
              className={'bg-whitish rounded-full p-1 hover:bg-gray-200'}
              icon={<ArrowLeft className={'h-5 w-6'} />}
              onClick={() => prevStep()}
            />
          </span>
          <div className={'w-full'}>
            <h1 className="text:xl mb-14 text-center font-bold md:text-2xl">
              Create New Space
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-10"
            >
              <Input
                inputName={'spaceName'}
                inputError={errors.spaceName}
                register={register('spaceName', { value: 'Space Name' })}
                publicSpaceName={publicSpaceName}
              />
              <Input
                inputName={'websiteUrl'}
                inputError={errors.websiteUrl}
                register={register('websiteUrl', {
                  value:
                    import.meta.env.VITE_ENV === 'development'
                      ? 'http://localhost:3000'
                      : 'https://testimonial.yshplsngh.in',
                })}
              />
              <Input
                inputName={'customMessage'}
                inputError={errors.customMessage}
                register={register('customMessage', {
                  value:
                    'We value your feedback! Please take a moment to share your thoughts about using Testimonial.',
                })}
              />
              <Input
                inputName={'question'}
                inputError={errors.question}
                register={register('question', {
                  value:
                    'How would you rate your overall experience with Testimonial?',
                })}
              />

              <Button
                type={'submit'}
                text={'Create New Space'}
                icon={<SquarePlus className={'h-4 w-4'} />}
                variant={'outlineB'}
                className={'text-md mt-5 h-9'}
                loading={loading}
              />
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CreateSpace;
