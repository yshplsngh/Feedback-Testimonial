import { useSteps } from '../hooks/useSteps';
import Dashboard from './Dashboard';
import CreateSpace from './CreateSpace';

const ManageDashboard = () => {
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
export default ManageDashboard;
