import { useSteps } from '../hooks/useSteps';
import Dashboard from './component/Dashboard';
import CreateSpace from './component/CreateSpace';

const ManageDash = () => {
  const { step, startStep, nextStep, prevStep } = useSteps();

  const steps = [
    <Dashboard key={'dashboard'} nextStep={nextStep} />,
    <CreateSpace
      key={'createSpace'}
      prevStep={prevStep}
      startStep={startStep}
    />,
  ];

  return steps[step];
};
export default ManageDash;
