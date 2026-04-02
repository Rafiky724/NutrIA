import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ArrowReturn from "../../components/Decoration/ArrowReturn";
import { crearMascota } from "../../services/mascotaService";
import LoadingScreen from "../../components/Loading/LoadingScreen";

export default function PetName() {
  const navigate = useNavigate();
  const location = useLocation();
  const tipo_mascota = location.state?.tipo_mascota;
  const [petName, setPetName] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });
  const [loading, setLoading] = useState(false);

  if (!tipo_mascota) {
    navigate("/adoptMoment");
  }

  const handleContinue = async () => {
    if (!petName.trim()) {
      setToast({
        open: true,
        message: "Debes escribir un nombre",
        type: "error",
      });
      return;
    }

    if (!tipo_mascota) {
      setToast({
        open: true,
        message: "Error: tipo de mascota no definido",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await crearMascota({
        tipo_mascota,
        nombre: petName,
      });

      navigate("/home");
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.response?.data?.detail || "Error al crear la mascota",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const petImages: Record<string, string> = {
    perro: "/SVG/Pets/Shop/Mascotas/perro.svg",
    gato: "/SVG/Pets/Shop/Mascotas/gato.svg",
    nutria: "/SVG/Pets/Shop/Mascotas/nutria.svg",
  };

  if (loading) {
    return (
      <LoadingScreen
        title="CARGANDO"
        subtitle={`Esto puede tardar un momento.\nEstas adoptando tu mascota.`}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
        <ArrowReturn to="/adoptMoment" />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-2xl max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50 flex flex-col gap-6">
          <div className="flex flex-row justify-center items-center gap-8">
            <img
              src="/SVG/Pets/Adopt/PetIcon.svg"
              alt="Nombre"
              className="w-14 h-14 md:w-16 md:h-16"
            />
            <h2 className="text-xl sm:text-xl md:text-2xl text-brown ft-bold mt-4">
              Ponle un nombre
            </h2>
          </div>

          <p className="ft-light text-sm sm:text-base text-justify my-0 md:my-2 text-gray">
            Elige un nombre que te inspire. Será tu compañero en cada logro, sea
            grande o pequeño.
          </p>

          <img
            src={
              petImages[tipo_mascota] || "/SVG/Pets/Shop/Mascotas/nutria.svg"
            }
            alt="Mascota"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover mx-auto border-3 rounded-4xl"
          />

          <input
            type="text"
            placeholder="Escribe aquí su nombre..."
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full sm:w-80 bg-input p-2 rounded-full text-brown placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow transition mx-auto"
          />

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-60 mx-auto block bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer mt-2"
          >
            Continuar
          </button>
        </div>
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />

      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
