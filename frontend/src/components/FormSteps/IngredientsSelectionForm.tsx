import { useEffect, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { CategoryWithIngredients, FormData } from "../../types";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categories } from "../../data/ingredients";
import ArrowNavigation from "../Decoration/ArrowNavigation";
import CustomIngredientModal from "../Modals/CustomIngredientModal";

type Props = {
  setValue: UseFormSetValue<FormData>;
  onSelectIngredients: (ingredients: CategoryWithIngredients[]) => void;
  nextStep: () => void;
};

export default function IngredientsSelectionForm({
  setValue,
  onSelectIngredients,
  nextStep,
}: Props) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const category = categories[currentCategory];

  const buildStructuredIngredients = (
    ingredients: string[],
    custom: string[],
  ): [string, string][] => {
    const result: [string, string][] = [];
    categories.forEach((category) => {
      ingredients.forEach((ing) => {
        if (category.items.some((item) => item.nombre === ing)) {
          let kind = category.nombre;
          if (kind === "Proteínas") kind = "Proteinas";
          if (kind === "Bebidas y Lácteos") kind = "Bebidas";
          if (kind === "Grasas saludables") kind = "Grasas";
          result.push([ing, kind]);
        }
      });
    });
    custom.forEach((ing) => result.push([ing, "Otros"]));
    return result;
  };

  const toggleSelect = (ingredient: string) => {
    setSelectedIngredients((prev) => {
      const updated = prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient];
      const structured = buildStructuredIngredients(updated, []);
      setValue("ingredientes", structured);
      onSelectIngredients(structured);
      return updated;
    });
  };

  useEffect(() => {
    const structured = buildStructuredIngredients(selectedIngredients, []);
    setValue("ingredientes", structured);
  }, [selectedIngredients, setValue]);

  const handleContinue = () => {
    let valid = true;
    categories.forEach((category) => {
      const selected = selectedIngredients.filter((i) =>
        category.items.some((item) => item.nombre === i),
      );
      if (selected.length < category.minimo) {
        toast.error(
          `Debes seleccionar al menos ${category.minimo} de ${category.nombre}`,
        );
        valid = false;
      }
    });
    if (!valid) return;
    const structured = buildStructuredIngredients(selectedIngredients, []);
    setValue("ingredientes", structured);
    onSelectIngredients(structured);
    nextStep();
  };

  const handleNextCategory = () => {
    setCurrentCategory((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1,
    );
  };
  const handlePrevCategory = () => {
    setCurrentCategory((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1,
    );
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 text-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
        <div className="w-12 sm:w-20">
          <img
            src="/SVG/IconsGeneral/BasketIcon.svg"
            alt="Cantidad de comidas"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>¿Qué alimentos quieres incluir en tu plan de comidas?</h2>
        </div>
      </div>

      {/* Descripción */}
      <p className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
        Marca los alimentos que tienes disponibles actualmente, que te gustan o
        que deseas que aparezcan en tu dieta. Puedes agregar otros.
      </p>

      {/* Categoría + Botón Otro */}
      <div className="relative flex items-center justify-center mb-4 w-full">
        <h2 className="ft-bold text-brown text-base sm:text-lg md:text-xl">
          {category.nombre}{" "}
          <span className="text-gray ft-medium text-sm sm:text-base">
            (mínimo {category.minimo})
          </span>
        </h2>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="absolute -top-2 right-2 sm:right-0 bg-yellow text-brown ft-medium px-3 py-1 rounded-full shadow-md cursor-pointer flex items-center gap-1 text-sm sm:text-base"
        >
          Otro <span className="ft-medium text-xl">+</span>
        </button>
      </div>

      {/* Lista de Ingredientes */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-h-64 p-2">
          {category.items.map((item, index) => {
            const isSelected = selectedIngredients.includes(item.nombre);
            return (
              <button
                key={`${category.nombre}-${index}`}
                type="button"
                onClick={() => toggleSelect(item.nombre)}
                className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-2xl duration-300 text-sm sm:text-base md:text-base hover:scale-105 transition cursor-pointer ${
                  isSelected
                    ? "bg-brown text-white shadow-md"
                    : "bg-input text-gray"
                }`}
              >
                {item.nombre}
                <img
                  src={item.icono}
                  alt={item.nombre}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 object-contain"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón Continuar */}
      <div className="mt-2 w-full flex justify-center">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full sm:w-72 md:w-80 bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl hover:scale-105 transition cursor-pointer"
        >
          Continuar
        </button>
      </div>

      {/* Toast */}
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

      {/* Navegación */}
      <ArrowNavigation
        onPrev={handlePrevCategory}
        onNext={handleNextCategory}
        size={8}
      />

      <CustomIngredientModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAccept={(ingredients) => {
          setSelectedIngredients((prev) => {
            const updated = [...prev, ...ingredients];
            const structured = buildStructuredIngredients(updated, []);
            setValue("ingredientes", structured);
            onSelectIngredients(structured);
            return updated;
          });
          setShowModal(false);
        }}
      />
    </div>
  );
}
