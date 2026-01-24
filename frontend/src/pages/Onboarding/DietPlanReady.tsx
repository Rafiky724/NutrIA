import { useNavigate } from "react-router-dom";
import { PlanService } from "../../services/planService"; // Asegúrate de la ruta
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function DietPlanReady() {
  const navigate = useNavigate();

  const handleContinue = async () => {
    try {
      const macros = await PlanService.getMacrosDiarios();

      localStorage.setItem("macrosDiarios", JSON.stringify(macros));

      navigate("/dailyNutritionPlan");
    } catch (error) {
      console.error("Error obteniendo macros:", error);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center">
        <div className="w-2xl text-center bg-white p-8 rounded-3xl shadow-md flex flex-col gap-6">
          <h1 className="text-2xl ft-bold text-brown">
            ¡Tu dieta ha sido creada!
          </h1>

          <p className="ft-light text-justify px-8 text-gray">
            NutrIA ha analizado tu información y creó un plan alimenticio
            diseñado para ayudarte a alcanzar tus objetivos de forma sostenible
            y adaptada a ti. A continuación podrás ver.
          </p>

          <div className="flex flex-col gap-4 mt-4 ">
            <div className="flex items-center gap-4 bg-input p-2 rounded-3xl justify-center w-lg mx-auto">
              <img
                src="/SVG/IconsGeneral/FireStreak.svg"
                alt="Macronutrientes"
                className="w-10 h-10"
              />
              <span className="text-brown ft-medium">
                Los macronutrientes diarios recomendados.
              </span>
            </div>

            <div className="flex items-center gap-4 bg-input p-2 rounded-3xl justify-center w-lg mx-auto">
              <img
                src="/SVG/IconsGeneral/Calendar.svg"
                alt="Calendario"
                className="w-10 h-10"
              />
              <span className="text-brown ft-medium">
                El día estimado en que alcanzarás tu objetivo.
              </span>
            </div>

            <div className="flex items-center gap-4 bg-input p-2 rounded-3xl justify-center w-lg mx-auto">
              <img
                src="/SVG/IconsGeneral/CupFruits.svg"
                alt="Copa de frutas"
                className="w-10 h-10"
              />
              <span className="text-brown ft-medium">
                Tu dieta semanal personalizada.
              </span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mx-auto bg-yellow text-brown ft-medium px-6 py-3 rounded-3xl mt-6 cursor-pointer w-2xs"
          >
            Continuar
          </button>
        </div>
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
