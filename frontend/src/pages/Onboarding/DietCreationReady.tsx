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
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl ft-bold text-brown mb-4">
            ¡Todo está listo, {name || "Usuario"}!
          </h1>

          <p className="ft-medium text-gray mb-8 text-sm sm:text-base md:text-lg px-2 sm:px-4 md:px-0">
            Ya analizamos tu información y ahora NutrIA usará inteligencia
            artificial para crear un plan alimenticio adaptado a tus objetivos y
            preferencias.
          </p>

          <button
            onClick={handleCreateDiet}
            disabled={loading}
            className={`w-full sm:w-64 md:w-72 bg-yellow text-brown ft-medium px-4 py-3 rounded-2xl flex items-center justify-center mx-auto ${
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

      {/* Frutas decorativas */}
      <div className="absolute left-0 bottom-0 z-10 w-28 sm:w-48 md:w-60">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-28 sm:w-48 md:w-60">
        <FruitRight />
      </div>
    </div>
  );
}
