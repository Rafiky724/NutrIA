import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DietService } from "../../services/dietaService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function DietCreationReady() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedname = localStorage.getItem("nombreUsuario");
    if (savedname) {
      setName(savedname);
    }
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
  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-2xl text-center">
            <h1 className="text-3xl ft-bold text-brown mb-4">
              ¡Todo está listo, {name || "Usuario"}!
            </h1>

            <p className="ft-medium text-gray mb-8 text-center px-4">
              Ya analizamos tu información y ahora NutrIA usará inteligencia
              artificial para crear un plan alimenticio adaptado a tus objetivos
              y preferencias.
            </p>

            <button
              onClick={handleCreateDiet}
              disabled={loading}
              className={`w-3xs mx-auto bg-yellow text-brown ft-medium px-4 py-3 rounded-2xl cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creando dieta..." : "Crear dieta"}
            </button>

            {error && <p className="text-red-500 mt-3">{error}</p>}
          </div>
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
