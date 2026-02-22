import { useForm } from "react-hook-form";
import { useState } from "react";
import type { FormData } from "../types";

export function useMultiStepForm() {
  const [step, setStep] = useState(0);
  
  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => setStep((prev) => prev - 1);

  return {
    ...methods,
    step,
    setStep,
    nextStep,
    prevStep,
  };
}