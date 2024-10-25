import { SubmitHandler, useForm } from 'react-hook-form';
import { EditedSpaceWithIdType, NewSpaceScheme, NewSpaceType } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { toast } from 'sonner';
import { FetchResponseError } from '../lib/manageFetch/api';
import { SquarePen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { selectSpaceBySpaceName } from './spaceSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { editSpace, getUserSpace } from './spaceApi';
import NotFound from '../pages/NotFound';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';

const EditSpace = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const { spaceName } = useParams<{ spaceName?: string }>();
  const space = useSelector((state: RootState) =>
    selectSpaceBySpaceName(state, spaceName),
  );

  useEffect(() => {
    async function fetchData() {
      if (spaceName === undefined) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        if (space === undefined) {
          await dispatch(getUserSpace(spaceName)).unwrap();
        }
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while fetching data';
        toast.error(errorMessage);
      }
    }

    fetchData().then(() => setLoading(false));
  }, [dispatch, spaceName, space]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<NewSpaceType>({
    resolver: zodResolver(NewSpaceScheme),
  });

  /**
   * coz react-hook-form set value available at initial render, and on re-render
   * it does not change values, so useEffect will take care of it
   */
  useEffect(() => {
    if (space) {
      reset({
        spaceName: space.spaceName,
        websiteUrl: space.websiteUrl,
        customMessage: space.customMessage,
        question: space.question,
      });
    }
  }, [space, reset]);

  const getParsedValue = <T extends keyof NewSpaceType>(field: T) => {
    const watchField = watch(field);
    return watchField ? NewSpaceScheme.shape[field].parse(watchField) : '';
  };
  const publicSpaceName = getParsedValue('spaceName');

  const onSubmit: SubmitHandler<NewSpaceType> = async (data: NewSpaceType) => {
    if (!space) {
      toast.error('something went wrong');
      return;
    }
    const editedSpaceWithId: EditedSpaceWithIdType = { ...data, id: space.id };

    if (isValid) {
      setEditLoading(true);
      try {
        await dispatch(editSpace(editedSpaceWithId)).unwrap();
        toast.success('space edit successfully');
        navigate('/dashboard');
      } catch (err) {
        const errorMessage =
          (err as FetchResponseError).message ||
          'An error occurred while editing the space.';
        toast.error(errorMessage);
      } finally {
        setEditLoading(false);
      }
    }
  };

  /**
   * if no data fetching is happening but still space is undefined,
   * then we did not receive data from backend or redux store is empty
   */
  if (!loading && (space === undefined || spaceName === undefined)) {
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
      <section className="flex items-center justify-center transition-all">
        <div className="bg-whitish relative mx-auto my-10 w-full max-w-[40rem] rounded-lg px-3 py-10 text-gray-800 shadow-2xl sm:px-6 md:flex md:px-12">
          <div className={'w-full'}>
            <h1 className="text:xl mb-14 text-center font-bold md:text-2xl">
              Edit Space
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-14"
            >
              <Input
                inputName={'spaceName'}
                inputError={errors.spaceName}
                register={register('spaceName')}
                publicSpaceName={publicSpaceName}
              />
              <Input
                inputName={'websiteUrl'}
                inputError={errors.websiteUrl}
                register={register('websiteUrl')}
              />
              <Input
                inputName={'customMessage'}
                inputError={errors.customMessage}
                register={register('customMessage')}
              />
              <Input
                inputName={'question'}
                inputError={errors.question}
                register={register('question')}
              />

              <div className={'flex justify-end space-x-3'}>
                <Button
                  type={'button'}
                  text={'cancel'}
                  variant={'outlineB'}
                  className={'w-fit'}
                  onClick={() => navigate(`/space/${spaceName}`)}
                />
                <Button
                  type={'submit'}
                  text={'Edit Space'}
                  icon={<SquarePen className={'h-4 w-4'} />}
                  variant={'outlineB'}
                  className={'w-fit'}
                  loading={editLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  ) : (
    <LoLoadingSpinner />
  );
};

export default EditSpace;
