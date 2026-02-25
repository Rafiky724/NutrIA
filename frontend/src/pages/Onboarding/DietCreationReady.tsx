import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DietService } from "../../services/dietaService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import LoadingIcon from "../../assets/Loading/LoadingIcon.svg?react";

export default function DietCreationReady() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedname = localStorage.getItem("nombreUsuario");
    if (savedname) setName(savedname);
  }, []);

  const handleCreateDiet = async () => {
    setLoading(true);
    setError(null);
    try {
      const message = await DietService.createDiet();
      console.log("Dieta creada:", message);
      navigate("/dietPlanReady");
    } catch (err: any) {
      console.error("Error al crear dieta:", err);
      setError("No se pudo crear la dieta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen
        Icon={LoadingIcon}
        title="CARGANDO"
        subtitle={`Esto puede tardar unos segundos.\nEstamos creando tu dieta personalizada.`}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center px-4 sm:px-6">
      <div className="flex flex-col min-h-screen items-center justify-center text-center">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <h1 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center">
            ¡Todo está listo, {name || "Usuario"}!
          </h1>

          <p className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
            Ya analizamos tu información y ahora NutrIA usará inteligencia
            artificial para crear un plan alimenticio adaptado a tus objetivos y
            preferencias.
          </p>

          <button
            onClick={handleCreateDiet}
            disabled={loading}
            className={`w-3xs md:w-80 bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl hover:scale-105 transition cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Crear dieta
          </button>

          {error && (
            <p className="text-red-500 mt-3 text-sm sm:text-base">{error}</p>
          )}
        </div>
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
