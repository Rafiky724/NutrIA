import type { SubmitHandler } from "react-hook-form";
import type { FormData } from "../../types";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import { useNavigate } from "react-router-dom";
import PersonalDataForm from "../../components/FormSteps/PersonalDataForm";
import GoalSelectionForm from "../../components/FormSteps/GoalSelectionForm";
import ActivityLevelForm from "../../components/FormSteps/ActivityLevelForm";
import HealthConditionCheckForm from "../../components/FormSteps/HealthConditionCheckForm";
import HealthConditionDetailsForm from "../../components/FormSteps/HealthConditionDetailsForm";
import DietPreferenceForm from "../../components/FormSteps/DietPreferenceForm";
import BudgetSelectionForm from "../../components/FormSteps/BudgetSelectionForm";
import WorkoutTypeForm from "../../components/FormSteps/WorkoutTypeForm";
import MealFrequencyForm from "../../components/FormSteps/MealFrequencyForm";
import IngredientsSelectionForm from "../../components/FormSteps/IngredientsSelectionForm";
import FinalForm from "../../components/FormSteps/FinalForm";
import GoalDetailsForm from "../../components/FormSteps/GoalDetailsForm";
import FruitRight from "../../components/Decoration/FruitRight";
import FruitLeft from "../../components/Decoration/FruitLeft";
import ProgressBar from "../../components/Decoration/ProgressBar";
import ArrowReturn from "../../components/Decoration/ArrowReturn";
import { useState } from "react";

export default function Form() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    step,
    nextStep,
    prevStep,
  } = useMultiStepForm();

  const navigate = useNavigate();

  const [showPersonalDataError, setShowPersonalDataError] = useState(0);
  const [showGoalDetailsFormError, setShowGoalDetailsFormError] = useState(0);
  const [
    showHealthConditionDetailsFormError,
    setShowGHealthConditionDetailsFormError,
  ] = useState(0);
  const [showMealFrequencyFormError, setShowMealFrequencyFormError] =
    useState(0);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    localStorage.setItem("datosNutrIA", JSON.stringify(data));
    navigate("/register");
  };

  const fieldNames: (keyof FormData)[][] = [
    ["fecha_nacimiento", "genero", "peso_actual", "altura_cm"],
    ["tipo_objetivo"],
    ["peso_objetivo", "velocidad_dieta"],
    ["nivel_actividad"],
    ["tieneEnfermedad"],
    ["enfermedad"],
    ["tipo_dieta"],
    ["presupuesto"],
    ["tipo_actividad"],
    ["cantidad_comidas"],
    ["ingredientes"],
  ];

  const handleNext = async () => {
    const currentField = fieldNames[step];
    const isValid = await trigger(currentField);

    if (!isValid) {
      if (step === 0) setShowPersonalDataError((prev) => prev + 1);
      if (step === 2) setShowGoalDetailsFormError((prev) => prev + 1);
      if (step === 5)
        setShowGHealthConditionDetailsFormError((prev) => prev + 1);
      if (step === 9) setShowMealFrequencyFormError((prev) => prev + 1);
      return;
    }

    nextStep();
  };

  const steps = [
    <PersonalDataForm
      register={register}
      setValue={setValue}
      getValues={getValues}
      showError={showPersonalDataError}
    />,
    <GoalSelectionForm
      register={register}
      onSelectObjective={(objective) => setValue("tipo_objetivo", objective)}
      nextStep={nextStep}
    />,
    <GoalDetailsForm
      register={register}
      setValue={setValue}
      getValues={getValues}
      showError={showGoalDetailsFormError}
    />,
    <ActivityLevelForm
      register={register}
      onSelectActivity={(activity) => setValue("nivel_actividad", activity)}
      nextStep={nextStep}
    />,
    <HealthConditionCheckForm
      register={register}
      onSelectHasDisease={(hasDisease) =>
        setValue("tieneEnfermedad", hasDisease)
      }
      nextStep={nextStep}
    />,
    <HealthConditionDetailsForm
      register={register}
      onSelectDisease={(disease) => setValue("enfermedad", disease)}
      showError={showHealthConditionDetailsFormError}
    />,
    <DietPreferenceForm
      register={register}
      onSelectDietType={(typeDiet) => setValue("tipo_dieta", typeDiet)}
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <BudgetSelectionForm
      register={register}
      onSelectBudget={(budget) => setValue("presupuesto", budget)}
    />,
    <WorkoutTypeForm
      register={register}
      onSelectActivity={(activitytype) =>
        setValue("tipo_actividad", activitytype)
      }
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <MealFrequencyForm
      register={register}
      onSelectQuantityMeals={(quantityMeals) =>
        setValue("cantidad_comidas", quantityMeals)
      }
      nextStep={nextStep}
      showError={showMealFrequencyFormError}
    />,
    <IngredientsSelectionForm
      setValue={setValue}
      onSelectIngredients={(ingredients) =>
        setValue("ingredientes", ingredients)
      }
      nextStep={nextStep}
    />,
    <FinalForm />,
  ];

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 sm:w-60 md:w-80 lg:w-96 h-3 bg-brown rounded-full">
        <ProgressBar progress={progress} />
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50"
        >
          {steps[step]}

          {/* Back Arrow */}
          {step === 0 ? (
            <ArrowReturn />
          ) : step !== 6 && step !== 8 ? (
            <ArrowReturn onClick={prevStep} />
          ) : null}

          {/* Buttons */}
          <div className="flex justify-center pt-6">
            {(step === 0 ||
              step === 2 ||
              step === 5 ||
              step === 7 ||
              step === 9) && (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Continuar
              </button>
            )}

            {step === 11 && (
              <button
                type="submit"
                className="w-full sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Crear Cuenta
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Decorations */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
