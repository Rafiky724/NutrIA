import { useState } from "react";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import FruitLeft from "../../../Decoration/FruitLeft";
import FruitRight from "../../../Decoration/FruitRight";
import { useNavigate } from "react-router-dom";
import { cambiarDiaActualizar } from "../../../../services/planService";
import Toast from "../../../Toast/Toast";

export default function UpdateDate() {
  const [daySelected, setDaySelected] = useState<string | null>(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const navigate = useNavigate();

  const daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const dayMap: Record<string, string> = {
    Lunes: "lunes",
    Martes: "martes",
    Miércoles: "miercoles",
    Jueves: "jueves",
    Viernes: "viernes",
    Sábado: "sabado",
    Domingo: "domingo",
  };

  const handleUpdate = async () => {
    if (!daySelected) {
      setToast({
        open: true,
        message: "Debes seleccionar un día primero",
        type: "error",
      });
      return;
    }

    try {
      await cambiarDiaActualizar({
        dia_actualizar_dieta: dayMap[daySelected],
      });

      setToast({
        open: true,
        message: `Día de actualización cambiado a ${daySelected}`,
        type: "success",
      });

      setTimeout(() => {
        navigate("/config");
      }, 1000);
    } catch (error) {
      console.error("Error al actualizar el día:", error);
      setToast({
        open: true,
        message: "Ocurrió un error al actualizar el día",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center p-6">
      <div className="bg-white w-full sm:w-xl rounded-3xl shadow p-6 sm:p-8 flex flex-col gap-6 text-center z-50">
        <h1 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left mx-auto">
          Por último, tu dieta, a tu ritmo
        </h1>
        <p className="text-gray text-sm sm:text-base md:text-lg text-justify px-2 sm:px-6">
          Elige el día de la semana en el que prefieres que se actualice tu
          dieta cada semana.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {daysWeek.map((day) => (
            <button
              key={day}
              onClick={() => setDaySelected(day)}
              className={`px-6 py-3 rounded-xl font-semibold cursor-pointer text-sm sm:text-base md:text-lg hover:scale-105 transition ${
                daySelected === day
                  ? "bg-brown text-white shadow"
                  : "bg-input text-brown"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          className="w-3xs md:w-4xs bg-yellow text-brown ft-medium py-2 rounded-4xl shadow mx-auto block hover:scale-105 transition cursor-pointer"
        >
          Actualizar
        </button>

        <div className="flex justify-start px-2 sm:px-6">
          <ArrowReturn to="/Config" />
        </div>
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />

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
