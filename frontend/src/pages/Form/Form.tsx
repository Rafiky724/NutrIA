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
    ["fecha_nacimiento", "genero", "peso_actual", "altura_cm"], // Step 1 PersonalDataForm
    ["tipo_objetivo"], // Step 2
    ["peso_objetivo", "velocidad_dieta"], // Step 2_1
    ["nivel_actividad"], // Step 3
    ["tieneEnfermedad"], // Step 4
    ["enfermedad"], //Step 5
    ["tipo_dieta"], //Step 6
    ["presupuesto"], //Step 7
    ["tipo_actividad"], //Step 8
    ["cantidad_comidas"], //Step 9
    ["ingredientes"], //Step 10
  ];

  const handleNext = async () => {
    const currentField = fieldNames[step];
    const isValid = await trigger(currentField);
    if (!isValid) {
      if (step === 0) {
        setShowPersonalDataError((prev) => prev + 1);
      }
      if (step == 2) {
        setShowGoalDetailsFormError((prev) => prev + 1);
      }
      if (step == 5) {
        setShowGHealthConditionDetailsFormError((prev) => prev + 1);
      }
      if (step == 9) {
        setShowMealFrequencyFormError((prev) => prev + 1);
      }
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
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-xs md:w-sm lg:w-2xl 2xl:w-4xl bg-white p-8 rounded-3xl shadow-md text-center"
          >
            {steps[step]}

            {step === 0 ? (
              <ArrowReturn />
            ) : step !== 6 && step !== 8 ? (
              <ArrowReturn onClick={prevStep} />
            ) : null}

            <div className="flex justify-between pt-4">
              {(step === 0 ||
                step === 2 ||
                step === 5 ||
                step === 7 ||
                step === 9) && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-80 mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl cursor-pointer"
                >
                  Continuar
                </button>
              )}
              {step === 11 && (
                <button
                  type="submit"
                  className="w-80 mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl cursor-pointer"
                >
                  Crear Cuenta
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="absolute top-8 w-60 md:w-90 h-3 bg-brown rounded-full left-1/2 transform -translate-x-1/2">
        <ProgressBar progress={progress} />
      </div>

      <div className="absolute left-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitLeft />
      </div>

      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitRight />
      </div>
    </>
  );
}
