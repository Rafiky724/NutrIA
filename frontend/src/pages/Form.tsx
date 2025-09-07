import type { SubmitHandler } from "react-hook-form";
import type { FormData } from "../types";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { Link } from "react-router-dom";
import Step1 from "../components/formSteps/Step1";
import Step2 from "../components/formSteps/Step2";
import Step3 from "../components/formSteps/Step3";
import Step4 from "../components/formSteps/Step4";
import Step5 from "../components/formSteps/Step5";
import Step6 from "../components/formSteps/Step6";
import Step7 from "../components/formSteps/Step7";
import Step8 from "../components/formSteps/Step8";

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
    ["objetivo"], // Step 2
    ["actividad"], // Step 3
    ["tieneEnfermedad"], // Step 4
    ["enfermedad"], //Step 5
    ["tipoDieta"], //Step 6
    ["tipoActividad"], //Step 6
    ["presupuesto"], //Step 7
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
    <Step2
      register={register}
      errors={errors}
      onSelectObjetivo={(objetivo) => setValue("objetivo", objetivo)}
      nextStep={nextStep}
    />,
    <Step3
      register={register}
      onSelectActividad={(actividad) => setValue("actividad", actividad)}
      nextStep={nextStep}
    />,
    <Step4
      register={register}
      errors={errors}
      onSelectTieneEnfermedad={(tieneEnfermedad) =>
        setValue("tieneEnfermedad", tieneEnfermedad)
      }
      nextStep={nextStep}
    />,
    <Step5
      register={register}
      onSelectEnfermedad={(enfermedad) => setValue("enfermedad", enfermedad)}
    />,
    <Step6
      register={register}
      onSelectTipoDieta={(tipoDieta) => setValue("tipoDieta", tipoDieta)}
      nextStep={nextStep}
    />,
    <Step7
      register={register}
      onSelectActividad={(tipoActividad) => setValue("tipoActividad", tipoActividad)}
      nextStep={nextStep}
    />,
    <Step8
      register={register}
      onSelectPresupuesto={(presupuesto) => setValue("presupuesto", presupuesto)}
    />,
  ];

  const progress = ((step + 1) / steps.length) * 100;

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
              {(step === 0 || step === 4 || step === 7) && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-80 mx-auto bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer"
                >
                  Continuar
                </button>
              )}
              {step === 8 && (
                <button
                  type="submit"
                  className="w-80 mx-auto bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer"
                >
                  Finalizar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="absolute top-8 w-60 md:w-90 h-3 bg_brown rounded-full left-1/2 transform -translate-x-1/2">
        <div
          className="h-full bg-yellow-500 rounded-l-full"
          style={{ width: `${progress}%` }}
        ></div>
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
