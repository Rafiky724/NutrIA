import { useEffect, useState } from "react";
import { categories } from "../../data/ingredients";
import NavBar from "../../components/Home/NavBar";
import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";

type Ingredient = {
  nombre: string;
  icono: string;
  categoria: string;
};

export default function Pantry() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [pantry, setPantry] = useState<Ingredient[]>([]);

  const toggleIngredient = (ingredient: Ingredient) => {
    setPantry((prev) =>
      prev.some((i) => i.nombre === ingredient.nombre)
        ? prev.filter((i) => i.nombre !== ingredient.nombre)
        : [...prev, ingredient],
    );
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await HomeService.getHome();
        setHomeData(data);
      } catch (err) {
        console.error("Error al cargar datos del home", err);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        {/* NavBar */}
        <div className="block md:hidden">
          <NavBar user={homeData?.usuario} />
        </div>
        <div className="hidden md:block">
          <NavBar
            title="Alimentos disponibles"
            subtitle="Aquí puedes agregar o quitar los ingredientes que tienes disponibles"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center p-4 md:p-6 gap-6">
          {/* DESPENSA ACTUAL */}
          <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2 max-h-[600px] overflow-y-auto">
            <h3 className="ft-bold text-lg text-brown mb-2">
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
                        className="bg-input px-3 py-2 rounded-xl shadow-sm hover:scale-105 transition flex items-center gap-2 cursor-pointer ft-light"
                      >
                        {ingredient.nombre}
                        <img
                          src={ingredient.icono}
                          alt={ingredient.nombre}
                          className="w-5 h-5 object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* INGREDIENTES DISPONIBLES */}
          <div className="bg-white rounded-2xl shadow-md p-6 w-full max-h-[600px] flex flex-col">
            <h3 className="ft-bold text-lg text-brown mb-2">
              Agregar nuevos ingredientes
            </h3>

            {/* Lista de ingredientes de la categoría actual */}
            <div className="overflow-y-auto flex-1 mb-4 pr-2">
              {categories.map((cat) => {
                const availableItems = cat.items
                  .map((item) => ({
                    nombre: item.nombre,
                    icono: item.icono,
                    categoria: cat.nombre,
                  }))
                  .filter(
                    (item) => !pantry.some((p) => p.nombre === item.nombre),
                  );

                if (availableItems.length === 0) return null;

                return (
                  <div key={cat.nombre} className="p-2">
                    <h4 className="ft-medium text-brown mb-3">{cat.nombre}</h4>

                    <div className="flex flex-wrap gap-3">
                      {availableItems.map((ingredient) => (
                        <button
                          key={ingredient.nombre}
                          onClick={() => toggleIngredient(ingredient)}
                          className="bg-input px-3 py-2 rounded-xl shadow-sm hover:scale-105 transition flex items-center gap-2 cursor-pointer ft-light"
                        >
                          {ingredient.nombre}
                          <img
                            src={ingredient.icono}
                            alt={ingredient.nombre}
                            className="w-5 h-5 object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botón guardar */}
            <div className="flex justify-center">
              <button className="w-full sm:w-72 md:w-80 bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl hover:scale-105 transition cursor-pointer">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
