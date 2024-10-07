import { useCallback, useState } from 'react';

export const useSteps = () => {
  const [step, setStep] = useState(0);
  const startStep = useCallback(() => setStep(0), []);
  const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);
  const prevStep = useCallback(
    () => setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep)),
    [],
  );

  return { step, setStep, startStep, nextStep, prevStep };
};
