import { useState } from "react";
import { options } from "../../../../data/optionsPrice";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import type { Budget } from "../../../../types";
import { useNavigate } from "react-router-dom";
import {
  cambiarTipoDieta,
  type CambiarTipoDietaRequest,
} from "../../../../services/planService";

export default function BasedBudget() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<Budget>("Estándar");

  const handleContinuar = async () => {
    try {
      const presupuesto_num = options
        .find((o) => o.label === selected)
        ?.price.replace(/[^0-9]/g, "");

      const payload: CambiarTipoDietaRequest = {
        tipo_dieta: "Presupuesto",
        presupuesto_semanal: Number(presupuesto_num),
      };

      const response = await cambiarTipoDieta(payload);
      console.log("Tipo de dieta actualizado:", response);

      navigate("/home");
    } catch (error: any) {
      console.error("Error al actualizar tipo de dieta:", error);
      alert(error.response?.data?.detail || "Error al cambiar tipo de dieta");
    }
  };

  const handleSelect = (budget: Budget) => {
    setSelected(budget);
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
          <div className="px-4 sm:px-6 md:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className="w-16 sm:w-20">
                <img
                  src="/SVG/IconsGeneral/MoneyIcon.svg"
                  alt="Presupuesto"
                  className="w-full h-auto"
                />
              </div>
              <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
                <h2>Basada en presupuesto</h2>
              </div>
            </div>

            <div className="ft-light text-justify text-gray my-3 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
              <p>¿Cuál es tu presupuesto semanal para alimentación?</p>
            </div>

            <div className="w-full sm:w-96 mx-auto space-y-3 sm:space-y-4">
              {options.map(({ label, price }) => (
                <div
                  key={label}
                  onClick={() => handleSelect(label as Budget)}
                  className="cursor-pointer transition hover:scale-105"
                >
                  <div
                    className={`px-4 py-3 rounded-full flex items-center justify-between text-sm sm:text-base transition-colors duration-200 ${
                      selected === label
                        ? "bg-brown text-white"
                        : "bg-input text-brown"
                    }`}
                  >
                    <span className="ft-medium">{label}</span>
                    <span className="ft-light">{price}</span>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleContinuar}
                className="w-full sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Actualizar
              </button>
            </div>

            <div className="flex justify-start px-2 sm:px-6 mt-6">
              <ArrowReturn to="/updateTypeDiet" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
