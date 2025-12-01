import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Step10Props = {
  register: UseFormRegister<FormData>;
  onSelectIngredientes: (ingredientes: string[]) => void;
  nextStep: () => void;
};

export default function Step10({
  register,
  onSelectIngredientes,
  nextStep,
}: Step10Props) {
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>(
    []
  );
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);

  const categorias = [
    {
      nombre: "Proteínas",
      minimo: 0,
      items: [
        { nombre: "Pollo", icono: "/SVG/Ingredientes/Proteinas/Pollo.svg" },
        { nombre: "Carne", icono: "/SVG/Ingredientes/Proteinas/Carne.svg" },
        { nombre: "Higado", icono: "/SVG/Ingredientes/Proteinas/Higado.svg" },
        { nombre: "Cerdo", icono: "/SVG/Ingredientes/Proteinas/Cerdo.svg" },
        {
          nombre: "Pescado blanco",
          icono: "/SVG/Ingredientes/Proteinas/PescadoBlanco.svg",
        },
        {
          nombre: "Pescado azul",
          icono: "/SVG/Ingredientes/Proteinas/PescadoAzul.svg",
        },
        { nombre: "Huevo", icono: "/SVG/Ingredientes/Proteinas/Huevo.svg" },
        { nombre: "Tofu", icono: "/SVG/Ingredientes/Proteinas/Tofu.svg" },
        { nombre: "Seitán", icono: "/SVG/Ingredientes/Proteinas/Seitan.svg" },
        {
          nombre: "Proteina en polvo",
          icono: "/SVG/Ingredientes/Proteinas/ProteinaPolvo.svg",
        },
        { nombre: "Jamón", icono: "/SVG/Ingredientes/Proteinas/Jamon.svg" },
      ],
    },
    {
      nombre: "Verduras",
      minimo: 0,
      items: [
        {
          nombre: "Espinaca",
          icono: "/SVG/Ingredientes/Verduras/Espinaca.svg",
        },
        { nombre: "Cebolla", icono: "/SVG/Ingredientes/Verduras/Cebolla.svg" },
        { nombre: "Plátano", icono: "/SVG/Ingredientes/Verduras/Platano.svg" },
        { nombre: "Ajo", icono: "/SVG/Ingredientes/Verduras/Ajo.svg" },
        { nombre: "Tomate", icono: "/SVG/Ingredientes/Verduras/Tomate.svg" },
        {
          nombre: "Zanahoria",
          icono: "/SVG/Ingredientes/Verduras/Zanahoria.svg",
        },
        {
          nombre: "Pimentón",
          icono: "/SVG/Ingredientes/Verduras/Pimenton.svg",
        },
        { nombre: "Pepino", icono: "/SVG/Ingredientes/Verduras/Pepino.svg" },
        { nombre: "Lechuga", icono: "/SVG/Ingredientes/Verduras/Lechuga.svg" },
        { nombre: "Repollo", icono: "/SVG/Ingredientes/Verduras/Repollo.svg" },
        {
          nombre: "Cilantro",
          icono: "/SVG/Ingredientes/Verduras/Cilantro.svg",
        },
        { nombre: "Brócoli", icono: "/SVG/Ingredientes/Verduras/Brocoli.svg" },
        {
          nombre: "Remolacha",
          icono: "/SVG/Ingredientes/Verduras/Remolacha.svg",
        },
        { nombre: "Apio", icono: "/SVG/Ingredientes/Verduras/Apio.svg" },
        {
          nombre: "Berenjena",
          icono: "/SVG/Ingredientes/Verduras/Berenjena.svg",
        },
        {
          nombre: "Coliflor",
          icono: "/SVG/Ingredientes/Verduras/Coliflor.svg",
        },
      ],
    },
    {
      nombre: "Bebidas y Lácteos",
      minimo: 0,
      items: [
        {
          nombre: "Jugo natural",
          icono: "/SVG/Ingredientes/Bebidas/JugoNatural.svg",
        },
        {
          nombre: "Leche entera",
          icono: "/SVG/Ingredientes/Bebidas/LecheEntera.svg",
        },
        {
          nombre: "Yogurt natural",
          icono: "/SVG/Ingredientes/Bebidas/YogurNatural.svg",
        },
        {
          nombre: "Leche deslactosada",
          icono: "/SVG/Ingredientes/Bebidas/LecheDeslactosada.svg",
        },
        {
          nombre: "Yogurt griego",
          icono: "/SVG/Ingredientes/Bebidas/YogurGriego.svg",
        },
        {
          nombre: "Queso",
          icono: "/SVG/Ingredientes/Bebidas/Queso.svg",
        },
        {
          nombre: "Queso amarillo",
          icono: "/SVG/Ingredientes/Bebidas/QuesoAmarillo.svg",
        },
        {
          nombre: "Avena",
          icono: "/SVG/Ingredientes/Bebidas/AvenaLiquida.svg",
        },
        {
          nombre: "Leche de almendra",
          icono: "/SVG/Ingredientes/Bebidas/LecheAlmendra.svg",
        },
        {
          nombre: "Leche de soya",
          icono: "/SVG/Ingredientes/Bebidas/LecheSoya.svg",
        },
        {
          nombre: "Leche de coco",
          icono: "/SVG/Ingredientes/Bebidas/LecheCoco.svg",
        },
      ],
    },
    {
      nombre: "Carbohidratos",
      minimo: 0,
      items: [
        { nombre: "Arroz", icono: "/SVG/Ingredientes/Carbohidratos/Arroz.svg" },
        {
          nombre: "Arroz integral",
          icono: "/SVG/Ingredientes/Carbohidratos/ArrozIntegral.svg",
        },
        { nombre: "Pasta", icono: "/SVG/Ingredientes/Carbohidratos/Pasta.svg" },
        { nombre: "Pan", icono: "/SVG/Ingredientes/Carbohidratos/Pan.svg" },
        {
          nombre: "Pan integral",
          icono: "/SVG/Ingredientes/Carbohidratos/PanIntegral.svg",
        },
        {
          nombre: "Avena",
          icono: "/SVG/Ingredientes/Carbohidratos/Avena.svg",
        },
        {
          nombre: "Quinua",
          icono: "/SVG/Ingredientes/Carbohidratos/Quinua.svg",
        },
        {
          nombre: "Papa",
          icono: "/SVG/Ingredientes/Carbohidratos/Papa.svg",
        },
        {
          nombre: "Tortilla",
          icono: "/SVG/Ingredientes/Carbohidratos/Tortilla.svg",
        },
        {
          nombre: "Cereal",
          icono: "/SVG/Ingredientes/Carbohidratos/Cereal.svg",
        },
        {
          nombre: "Frijol",
          icono: "/SVG/Ingredientes/Carbohidratos/Frijol.svg",
        },
        {
          nombre: "Lenteja",
          icono: "/SVG/Ingredientes/Carbohidratos/Lenteja.svg",
        },
        {
          nombre: "Yuca",
          icono: "/SVG/Ingredientes/Carbohidratos/Yuca.svg",
        },
        {
          nombre: "Garbanzo",
          icono: "/SVG/Ingredientes/Carbohidratos/Garbanzo.svg",
        },
        {
          nombre: "Arveja",
          icono: "/SVG/Ingredientes/Carbohidratos/Arveja.svg",
        },
        {
          nombre: "Mazorca",
          icono: "/SVG/Ingredientes/Carbohidratos/Mazorca.svg",
        },
      ],
    },
    {
      nombre: "Frutas",
      minimo: 0,
      items: [
        {
          nombre: "Banano",
          icono: "/SVG/Ingredientes/Frutas/Banano.svg",
        },
        {
          nombre: "Manzana",
          icono: "/SVG/Ingredientes/Frutas/Manzana.svg",
        },
        {
          nombre: "Fresa",
          icono: "/SVG/Ingredientes/Frutas/Fresa.svg",
        },
        {
          nombre: "Uva",
          icono: "/SVG/Ingredientes/Frutas/Uva.svg",
        },
        {
          nombre: "Naranja",
          icono: "/SVG/Ingredientes/Frutas/Naranja.svg",
        },
        {
          nombre: "Mango",
          icono: "/SVG/Ingredientes/Frutas/Mango.svg",
        },
        {
          nombre: "Piña",
          icono: "/SVG/Ingredientes/Frutas/Piña.svg",
        },
        {
          nombre: "Papaya",
          icono: "/SVG/Ingredientes/Frutas/Papaya.svg",
        },
        {
          nombre: "Sandia",
          icono: "/SVG/Ingredientes/Frutas/Sandia.svg",
        },
        {
          nombre: "Kiwi",
          icono: "/SVG/Ingredientes/Frutas/Kiwi.svg",
        },
        {
          nombre: "Maracuyá",
          icono: "/SVG/Ingredientes/Frutas/Maracuya.svg",
        },
        {
          nombre: "Pera",
          icono: "/SVG/Ingredientes/Frutas/Pera.svg",
        },
        {
          nombre: "Mandarina",
          icono: "/SVG/Ingredientes/Frutas/Mandarina.svg",
        },
        {
          nombre: "Arándano",
          icono: "/SVG/Ingredientes/Frutas/Arandano.svg",
        },
        {
          nombre: "Durazno",
          icono: "/SVG/Ingredientes/Frutas/Durazno.svg",
        },
      ],
    },
    {
      nombre: "Grasas saludables",
      minimo: 0,
      items: [
        { nombre: "Aguacate", icono: "/SVG/Ingredientes/Grasas/Aguacate.svg" },
        {
          nombre: "Aceite de oliva",
          icono: "/SVG/Ingredientes/Grasas/AceiteOliva.svg",
        },
        {
          nombre: "Aceite de coco",
          icono: "/SVG/Ingredientes/Grasas/AceiteCoco.svg",
        },
        {
          nombre: "Mantequilla de maní",
          icono: "/SVG/Ingredientes/Grasas/MantequillaMani.svg",
        },
        {
          nombre: "Almendras",
          icono: "/SVG/Ingredientes/Grasas/Almendras.svg",
        },
        {
          nombre: "Maní",
          icono: "/SVG/Ingredientes/Grasas/Mani.svg",
        },
        {
          nombre: "Nueces",
          icono: "/SVG/Ingredientes/Grasas/Nueces.svg",
        },
        {
          nombre: "Chía",
          icono: "/SVG/Ingredientes/Grasas/Chia.svg",
        },
        {
          nombre: "Semillas de lino",
          icono: "/SVG/Ingredientes/Grasas/SemillasLino.svg",
        },
        {
          nombre: "Aceitunas",
          icono: "/SVG/Ingredientes/Grasas/Aceitunas.svg",
        },
        {
          nombre: "Chocolate",
          icono: "/SVG/Ingredientes/Grasas/Chocolate.svg",
        },
      ],
    },
    {
      nombre: "Otros",
      minimo: 0,
      items: [
        { nombre: "Miel", icono: "/SVG/Ingredientes/Otros/Miel.svg" },
        { nombre: "Mayonesa", icono: "/SVG/Ingredientes/Otros/Mayonesa.svg" },
        { nombre: "Mostaza", icono: "/SVG/Ingredientes/Otros/Mostaza.svg" },
        {
          nombre: "Salsa de tomate",
          icono: "/SVG/Ingredientes/Otros/SalsaTomate.svg",
        },
        {
          nombre: "Cacao en polvo",
          icono: "/SVG/Ingredientes/Otros/CacaoPolvo.svg",
        },
        {
          nombre: "Salsa de soya",
          icono: "/SVG/Ingredientes/Otros/SalsaSoya.svg",
        },
      ],
    },
  ];

  // 🔸 Manejar selección
  const toggleSelect = (ingrediente: string) => {
    const updated = selectedIngredientes.includes(ingrediente)
      ? selectedIngredientes.filter((i) => i !== ingrediente)
      : [...selectedIngredientes, ingrediente];

    setSelectedIngredientes(updated);
    onSelectIngredientes(updated);
  };

  const handleNextCategory = () => {
    setCurrentCategory((prev) =>
      prev === categorias.length - 1 ? 0 : prev + 1
    );
  };
  const handlePrevCategory = () => {
    setCurrentCategory((prev) =>
      prev === 0 ? categorias.length - 1 : prev - 1
    );
  };

  // 🔸 Validación
  useEffect(() => {
    register("ingredientes", {
      validate: (value: string[]) => {
        for (const categoria of categorias) {
          const seleccionados = value.filter((i) =>
            categoria.items.some((item) => item.nombre === i)
          );
          if (seleccionados.length < categoria.minimo) {
            return `Debes seleccionar al menos ${categoria.minimo} de ${categoria.nombre}`;
          }
        }
        return true;
      },
    });
  }, [register]);

  const categoriaActual = categorias[currentCategory];

  // 🔹 Modal: agregar ingredientes personalizados
  const handleAddCustom = () => {
    const trimmed = newIngredient.trim();
    if (trimmed && !customIngredients.includes(trimmed)) {
      setCustomIngredients([...customIngredients, trimmed]);
      setNewIngredient("");
    }
  };

  const handleAcceptCustom = () => {
    const updated = [...selectedIngredientes, ...customIngredients];
    setSelectedIngredientes(updated);
    onSelectIngredientes(updated);
    setShowModal(false);
    setCustomIngredients([]);
  };

  return (
    <div className="flex flex-col items-center w-full text-center relative">
      {/* Flechas */}
      <button
        type="button"
        onClick={handlePrevCategory}
        className="absolute left-4 top-2/3 transform -translate-y-1/2 text-3xl text-brown hover:text-yellow-500"
      >
        <img
          src="/SVG/FlechaPasar.svg"
          alt="Anterior"
          className="w-8 h-8 rotate-180"
        />
      </button>
      <button
        type="button"
        onClick={handleNextCategory}
        className="absolute right-4 top-2/3 transform -translate-y-1/2 text-3xl text-brown hover:text-yellow-500"
      >
        <img
          src="/SVG/FlechaPasar.svg"
          alt="Siguiente"
          className="w-8 h-8 " // rota 180° para que apunte a la derecha
        />
      </button>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="w-20">
          <img
            src="/SVG/Escudo.svg"
            alt="Cantidad de comidas"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-2xl">
          <h2>¿Qué alimentos quieres incluir en tu plan de comidas?</h2>
        </div>
      </div>

      <p className="poppins-light font_brown mb-6">
        Marca los alimentos que tienes disponibles actualmente, que te gustan o
        que deseas que aparezcan en tu dieta
      </p>

      {/* Título + botón Otro */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-brown">
          {categoriaActual.nombre}{" "}
          <span className="text-gray-500 text-md">
            (mínimo {categoriaActual.minimo})
          </span>
        </h2>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-brown font-semibold px-3 py-1 rounded-full shadow-md"
        >
          + Otro
        </button>
      </div>

      {/* Ingredientes con scroll */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex flex-wrap justify-center gap-3 max-h-64 overflow-y-auto p-2">
          {categoriaActual.items.map((item, index) => {
            const isSelected = selectedIngredientes.includes(item.nombre);
            return (
              <button
                key={`${categoriaActual.nombre}-${index}`}
                type="button"
                onClick={() => toggleSelect(item.nombre)}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl transition-all duration-300 text-sm sm:text-base cursor-pointer ${
                  isSelected
                    ? "bg-amber-900 text-white shadow-md scale-105"
                    : "bg-amber-100 border border-gray-300 text-gray-700 hover:bg-yellow-100"
                }`}
              >
                {item.nombre}
                <img
                  src={item.icono}
                  alt={item.nombre}
                  className="w-5 h-5 object-contain"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón Continuar */}
      <div className="mt-2">
        <button
          type="button"
          onClick={() => {
            // Validar categorías
            let valid = true;
            for (const categoria of categorias) {
              const seleccionados = selectedIngredientes.filter((i) =>
                categoria.items.some((item) => item.nombre === i)
              );
              if (seleccionados.length < categoria.minimo) {
                toast.error(
                  `Debes seleccionar al menos ${categoria.minimo} de ${categoria.nombre}`
                );
                valid = false;
              }
            }

            if (valid) {
              nextStep(); // avanzar si todo está bien
            }
          }}
          className="w-80 mx-auto bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer"
        >
          Continuar
        </button>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Campo oculto */}
      <input
        type="hidden"
        value={selectedIngredientes.join(",")}
        {...register("ingredientes")}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <h3 className="text-xl font-bold mb-4 text-brown">
              Agregar alimentos
            </h3>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Izquierda */}
              <div className="flex-1 flex flex-col items-start">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Nombre del alimento"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
                />
                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="bg-yellow-400 hover:bg-yellow-500 text-brown font-semibold px-4 py-2 rounded-lg shadow-md"
                >
                  Agregar
                </button>
              </div>

              {/* Derecha */}
              <div className="flex-1 border-l border-gray-300 pl-4 max-h-40 overflow-y-auto">
                <h4 className="font-semibold mb-2 text-brown">
                  Alimentos añadidos:
                </h4>
                {customIngredients.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No has agregado alimentos aún.
                  </p>
                ) : (
                  <ul className="text-left text-sm text-gray-700">
                    {customIngredients.map((item, i) => (
                      <li key={i} className="py-1 border-b border-gray-200">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Botones finales */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAcceptCustom}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
