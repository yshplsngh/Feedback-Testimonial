import { SubmitHandler, useForm } from 'react-hook-form';
import { NewSpaceScheme, NewSpaceType } from './Types';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';

const NewSpace = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NewSpaceType>({ resolver: zodResolver(NewSpaceScheme) });

  const onSubmit: SubmitHandler<NewSpaceType> = (data: NewSpaceType) => {
    console.log(data);
    if (isValid) {
      console.log('valid data');
    }
  };

  return (
    <section className="flex items-center justify-center transition-all">
      <main className="mx-auto my-10 w-full max-w-2xl space-y-6 rounded-lg bg-white px-12 py-12 shadow-2xl">
        <h1 className="mb-14 text-center text-2xl font-bold text-gray-800">
          New Project
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <Input
            inputName={'spaceName'}
            inputError={errors.spaceName}
            register={register}
            watch={watch}
          />
          <Input
            inputName={'websiteUrl'}
            inputError={errors.websiteUrl}
            register={register}
            watch={watch}
          />
          <Input
            inputName={'headerTitle'}
            inputError={errors.headerTitle}
            register={register}
            watch={watch}
          />
          <Input
            inputName={'customMessage'}
            inputError={errors.customMessage}
            register={register}
            watch={watch}
          />
          <Input
            inputName={'question'}
            inputError={errors.question}
            register={register}
            watch={watch}
          />

          <Button
            type={'submit'}
            text={'Create '}
            variant={'outlineB'}
            className={'w-full text-lg'}
          />
        </form>
      </main>
    </section>
  );
};

export default NewSpace;
