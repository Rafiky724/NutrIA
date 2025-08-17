import type { SubmitHandler } from "react-hook-form";
import type { FormData } from "../types";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import Step1 from "../components/formSteps/Step1";
import Step2 from "../components/formSteps/Step2";
import { Link } from "react-router-dom";

export default function Form() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
    step,
    nextStep,
    prevStep,
  } = useMultiStepForm();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const stored = JSON.parse(localStorage.getItem("datosNutrIA") || "[]");
    const updated = [...stored, data];
    localStorage.setItem("datosNutrIA", JSON.stringify(updated));

    console.log("Formulario guardado:", updated);
  };

  const fieldNames: (keyof FormData)[][] = [
    ["edad", "genero", "peso", "altura"], // Step 1
    ["otro"], // Step 2
  ];

  const handleNext = async () => {
    const currentField = fieldNames[step];
    const isValid = await trigger(currentField);
    if (isValid) nextStep();
  };

  const steps = [
    <Step1
      register={register}
      setValue={setValue}
      getValues={getValues}
      errors={errors}
    />,
    <Step2 register={register} errors={errors} />,
  ];

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-xs md:w-sm lg:w-2xl 2xl:w-4xl bg_white_card p-8 rounded-3xl shadow-md text-center"
          >
            {steps[step]}
            <div className="absolute top-5 left-5 z-10 w-10">
              {step === 0 ? (
                <Link to="/">
                  <img
                    src="/SVG/Flecha.svg"
                    alt="Volver al inicio"
                    className="w-auto h-auto cursor-pointer"
                  />
                </Link>
              ) : (
                <img
                  src="/SVG/Flecha.svg"
                  alt="Volver al paso anterior"
                  className="w-auto h-auto cursor-pointer"
                  onClick={prevStep}
                />
              )}
            </div>

            <div className="flex justify-between pt-4">
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer"
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer"
                >
                  Continuar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack1.png"
          alt="Logo NutrIA"
          className="w-auto h-auto"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack2.png"
          alt="Logo NutrIA"
          className="w-auto h-auto"
        />
      </div>
    </>
  );
}
