import { useEffect, useState } from "react";
import NavBar from "../../components/Home/NavBar";
import { categories } from "../../data/ingredients";
import type { HomeResponse } from "../../types";
import { getIngredientIcon } from "../../utils/ingredients";
import {
  getIngredientesUsuario,
  actualizarIngredientesUsuario,
  type Ingrediente,
} from "../../services/despensaService";

interface IngredientWithCategory {
  nombre: string;
  icono: string;
  categoria: string;
}

export default function Pantry() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [pantry, setPantry] = useState<IngredientWithCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleIngredient = (ingredient: IngredientWithCategory) => {
    setPantry((prev) =>
      prev.some((i) => i.nombre === ingredient.nombre)
        ? prev.filter((i) => i.nombre !== ingredient.nombre)
        : [...prev, ingredient],
    );
  };

  const categorizeIngredients = (
    ingredientes: Ingrediente[],
  ): IngredientWithCategory[] => {
    return ingredientes.map((ing) => {
      const categoria =
        categories.find((cat) =>
          cat.items.some(
            (item) => item.nombre.toLowerCase() === ing.nombre.toLowerCase(),
          ),
        )?.nombre || "Otros";

      return {
        nombre: ing.nombre,
        icono: getIngredientIcon(ing.nombre),
        categoria,
      };
    });
  };

  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const data = await getIngredientesUsuario();
        const categorized = categorizeIngredients(data.ingredientes);
        setPantry(categorized);
      } catch (err) {
        console.error("Error cargando despensa del usuario:", err);
      }
    };

    fetchPantry();
  }, []);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await import("../../services/homeService").then((mod) =>
          mod.HomeService.getHome(),
        );
        setHomeData(data);
      } catch (err) {
        console.error("Error al cargar datos del home", err);
      }
    };
    fetchHomeData();
  }, []);

  const handleGuardar = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const payload: { ingredientes: { nombre: string }[] } = {
        ingredientes: pantry.map((i) => ({ nombre: i.nombre })),
      };

      const data = await actualizarIngredientesUsuario(payload);

      console.log("Despensa actualizada:", data);
      alert("Despensa actualizada correctamente ✅");
    } catch (err) {
      console.error("Error al actualizar la despensa:", err);
      alert("Ocurrió un error al guardar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        <div className="block md:hidden">
          <NavBar user={homeData?.usuario} subtitle="Estás en la despensa" />
        </div>
        <div className="hidden md:block">
          <NavBar
            user={homeData?.usuario}
            title="Alimentos disponibles"
            subtitle="Aquí puedes agregar o quitar los ingredientes que tienes disponibles"
          />
        </div>

        <div className="flex gap-4 md:gap-6 flex-col md:flex-row items-center justify-center">
          {/* DESPENSA ACTUAL */}
          <div className="flex flex-col bg-white rounded-4xl p-4 md:p-6 shadow gap-4 ml-10 w-2xs md:ml-0 h-95 md:w-1/2 xl:w-1/3 md:h-[550px] lg:h-[600px] xl:h-[800px] max-h-[800px] overflow-y-auto">
            <h3 className="ft-bold text-lg text-brown mb-0 md:mb-2">
              Tu despensa actual
            </h3>

            {pantry.length === 0 && (
              <p className="text-gray text-sm">
                No tienes ingredientes agregados.
              </p>
            )}

            {categories.map((cat) => {
              const items = pantry.filter((i) => i.categoria === cat.nombre);
              if (items.length === 0) return null;

              return (
                <div key={cat.nombre} className="p-2">
                  <h4 className="ft-medium text-brown mb-3">{cat.nombre}</h4>
                  <div className="flex flex-wrap gap-3">
                    {items.map((ingredient) => (
                      <button
                        key={ingredient.nombre}
                        onClick={() => toggleIngredient(ingredient)}
                        className="bg-input text-brown px-3 py-2 rounded-xl shadow-sm hover:scale-105 transition flex items-center gap-2 cursor-pointer ft-light text-xs md:text-md"
                      >
                        {ingredient.nombre}
                        <img
                          src={ingredient.icono}
                          alt={ingredient.nombre}
                          className="w-4 md:w-5 h-4 md:h-5"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* INGREDIENTES DISPONIBLES */}
          <div className="flex flex-col bg-white rounded-4xl p-4 md:p-6 shadow gap-4 ml-10 w-2xs md:ml-0 h-95 md:w-1/2 xl:w-2/2 md:h-[550px] lg:h-[600px] xl:h-[800px] max-h-[800px] overflow-y-auto">
            <h3 className="ft-bold text-lg text-brown mb-0 md:mb-2">
              Agregar nuevos ingredientes
            </h3>

            <div className="overflow-y-auto flex-1 mb-4 pr-2">
              {categories.map((cat) => {
                const allItems = cat.items.map((item) => ({
                  nombre: item.nombre,
                  icono: item.icono,
                  categoria: cat.nombre,
                  isAdded: pantry.some((p) => p.nombre === item.nombre),
                }));

                if (allItems.length === 0) return null;

                return (
                  <div key={cat.nombre} className="p-2">
                    <h4 className="ft-medium text-brown mb-3">{cat.nombre}</h4>
                    <div className="flex flex-wrap gap-3">
                      {allItems.map((ingredient) => (
                        <button
                          key={ingredient.nombre}
                          onClick={() => toggleIngredient(ingredient)}
                          className={`px-3 py-2 rounded-xl shadow-sm hover:scale-105 transition flex items-center gap-2 cursor-pointer ft-light text-xs md:text-md ${
                            ingredient.isAdded
                              ? "bg-brown text-white"
                              : "bg-input text-brown"
                          }`}
                        >
                          {ingredient.nombre}
                          <img
                            src={ingredient.icono}
                            alt={ingredient.nombre}
                            className="w-4 md:w-5 h-4 md:h-5"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGuardar}
                disabled={loading}
                className="w-full sm:w-72 md:w-80 bg-yellow text-brown ft-medium py-2 rounded-3xl hover:scale-105 transition cursor-pointer text-sm disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
