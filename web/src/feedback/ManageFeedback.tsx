import { useSteps } from '../hooks/useSteps';
import Feedback from './components/Feedback';
import ThankYouPage from './components/ThankYouPage';
import { toast } from 'sonner';

const ManageFeedback = () => {
  const { step, startStep, nextStep } = useSteps();
  const steps = [
    <Feedback
      key={'feedback'}
      onNext={() => {
        toast.success('Thank you for giving feedback');
        nextStep();
      }}
    />,
    <ThankYouPage key={'thankYouPage'} startStep={startStep} />,
  ];

  return steps[step];
};

export default ManageFeedback;
