import Button from '../../ui/components/Button';

const ThankYouPage = ({ startStep }: { startStep: () => void }) => {
  return (
    <div className="flex h-[90vh] cursor-pointer items-center justify-center font-sans text-2xl text-blue-500">
      <div>
        <Button
          variant={'secondary'}
          type={'button'}
          text={'thank you'}
          onClick={() => startStep()}
        />
      </div>
    </div>
  );
};
export default ThankYouPage;
