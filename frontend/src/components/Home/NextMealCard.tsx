import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Estado, HomeResponse, Ingredient, NextMeal } from "../../types";
import { categories as ingredientsAvailable } from "../../data/ingredients";
import { getIngredientIcon } from "../../utils/ingredients";
import { useState } from "react";
import CompleteMeal from "./Completed/CompleteMeal";
import ConfirmMeal from "./Completed/ConfirmMeal";
import VerifyMeal from "./Completed/VerifyMeal";
import NotCompletedMeal from "./Completed/NotCompletedMeal";
import AbsentMeal from "./Completed/AbsentMeal";
import EstimateMeal from "./Completed/EstimateMeal";
import { cancelarComida } from "../../services/comidaService";

type Props = {
  homeData: HomeResponse | null;
  nextFood?: NextMeal | null;
  estado?: Estado | null;
  onRefetch: () => void;
};

export default function NextMealCard({
  homeData,
  nextFood,
  estado,
  onRefetch,
}: Props) {

  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [openNotCompleted, setOpenNotCompleted] = useState(false);
  const [openAbsentMeal, setOpenAbsentMeal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [, setAbsentText] = useState("");
  const [openEstimateModal, setOpenEstimateModal] = useState(false);
  const [, setOpenFinalOptionsModal] = useState(false);
  const [, setComidaId] = useState<string | null>(null);

  if (!homeData) {
    return (
      <div className="w-2xs md:w-lg xl:w-4xl md:h-95 bg-white rounded-3xl p-4 shadow flex flex-col gap-4 ml-10 md:ml-0 items-center">
        <Skeleton width={200} height={20} />

        <div className="w-full flex gap-4 flex-col md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <Skeleton width={240} height={200} borderRadius={12} />
            <Skeleton width={140} height={16} />
          </div>

          <div className="flex flex-4 flex-col w-full">
            <Skeleton width={200} height={14} className="mx-auto mb-3" />

            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray p-2 rounded-xl"
                >
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={120} height={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Skeleton width={180} height={40} />
      </div>
    );
  }


  if (!nextFood) {
    return (
      <div className="w-2xs md:w-lg xl:w-4xl md:h-95 bg-white rounded-3xl p-4 shadow flex flex-col gap-4 ml-10 md:ml-0 items-center">
        <Skeleton width={200} height={20} />

        <div className="w-full flex gap-4 flex-col md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <Skeleton width={240} height={200} borderRadius={12} />
            <Skeleton width={140} height={16} />
          </div>

          <div className="flex flex-4 flex-col w-full">
            <Skeleton width={200} height={14} className="mx-auto mb-3" />

            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray p-2 rounded-xl"
                >
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={120} height={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Skeleton width={180} height={40} />
      </div>
    );
  }

  const isDark = estado?.color === "#260B01";

  const handleRetry = async () => {
    if (!selectedOption) return;
    try {
      await cancelarComida({ comida_id: selectedOption.id });
      setComidaId(selectedOption.id);
      onRefetch();
      setOpenFinalOptionsModal(true);
    } catch (err) {
      console.error("Error al cancelar comida:", err);
    }
  };

  return (
    <>
      <div
        className={`w-2xs md:w-lg xl:w-4xl md:h-95 rounded-3xl p-4 shadow flex flex-col gap-4 ml-10 md:ml-0 items-center ${
          isDark ? "text-white" : "text-brown"
        }`}
        style={{
          backgroundColor: estado?.color || "white",
        }}
      >
        <h2
          className={`${isDark ? "text-white" : "text-brown"} ft-bold text-lg text-center`}
        >
          {estado?.mensaje} - {nextFood.hora_sugerida}
        </h2>

        <div className="w-full flex gap-4 overflow-hidden flex-col md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/SVG/ejemploPlato.jpeg"
              alt="Próxima comida"
              className="w-60 h-50 object-cover rounded-xl"
            />
            <span className="ft-medium text-sm md:text-md">
              {nextFood.tipo_comida} ≈ ${nextFood.precio_estimado} COP
            </span>
          </div>

          <div className="flex flex-4 flex-col">
            <div className="text-xs md:text-sm ft-medium mb-2 text-center">
              {nextFood.calorias} kcal | {nextFood.proteinas} P |{" "}
              {nextFood.carbohidratos} C | {nextFood.grasas} G
            </div>

            <div className="overflow-y-auto max-h-50">
              {nextFood?.ingredientes?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 mb-2 bg-gray p-2 rounded-xl ft-medium"
                >
                  <img
                    src={getIngredientIcon(item.nombre)}
                    alt={item.nombre}
                    className="w-5 md:w-6 h-5 md:h-6"
                  />
                  <span className="text-xs md:text-md text-black">
                    {item.cantidad} {item.nombre}
                  </span>
                </div>
              )) || (
                <p className="text-center text-sm text-gray-500">
                  No hay ingredientes
                </p>
              )}
            </div>

          </div>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-yellow text-brown ft-medium py-2 px-6 rounded-4xl self-center hover:scale-105 transition cursor-pointer"
        >
          ¡Completar comida!
        </button>
      </div>

      <CompleteMeal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSelectOption={(opt) => {
          setSelectedOption(opt);
          setOpenModal(false);

          if (opt.id === "1") setOpenConfirm(true);
          if (opt.id === "2") setOpenVerify(true);
          if (opt.id === "3") setOpenNotCompleted(true);
        }}
      />

      <ConfirmMeal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        option={selectedOption}
        onSuccess={onRefetch}
      />

      <VerifyMeal
        isOpen={openVerify}
        onClose={() => setOpenVerify(false)}
        option={selectedOption}
      />

      <NotCompletedMeal
        isOpen={openNotCompleted}
        onClose={() => setOpenNotCompleted(false)}
        onAction={(action) => {
          setOpenNotCompleted(false);
          if (action === "absent") setOpenAbsentMeal(true);
          if (action === "retry") handleRetry();
        }}
      />

      <AbsentMeal
        isOpen={openAbsentMeal}
        onClose={() => setOpenAbsentMeal(false)}
        onSubmit={(text) => {
          setAbsentText(text);
          setOpenAbsentMeal(false);
          setOpenEstimateModal(true);
        }}
      />

      <EstimateMeal
        isOpen={openEstimateModal}
        onClose={() => setOpenEstimateModal(false)}
        onContinue={() => {
          setOpenEstimateModal(false);
          setOpenFinalOptionsModal(true);
        }}
      />

      {/* <FinalOptions
        isOpen={openFinalOptionsModal}
        onClose={() => setOpenFinalOptionsModal(false)}
        onSelectOption={() => {
          setOpenFinalOptionsModal(false);
        }}
      /> */}
    </>
  );
}
