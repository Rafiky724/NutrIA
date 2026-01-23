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
          if (kind === "Otros") kind = "Otros";
          if (kind === "Carbohidratos") kind = "Carbohidratos";
          if (kind === "Frutas") kind = "Frutas";
          if (kind === "Verduras") kind = "Verduras";

          result.push([ing, kind]);
        }
      });
    });

    custom.forEach((ing) => {
      result.push([ing, "Otros"]);
    });

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

  // validación
  useEffect(() => {
    const structured = buildStructuredIngredients(selectedIngredients, []);
    setValue("ingredientes", structured);
  }, [selectedIngredients, setValue]);

  // Cuando el usuario pulsa "Continuar"
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
    <div className="flex flex-col items-center w-full text-center relative">
      <ArrowNavigation
        onPrev={handlePrevCategory}
        onNext={handleNextCategory}
        size={8}
      />

      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/BasketIcon.svg"
            alt="Cantidad de comidas"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl w-sm text-brown">
          <h2>¿Qué alimentos quieres incluir en tu plan de comidas?</h2>
        </div>
      </div>

      <p className="ft-light text-gray mb-6 text-justify px-8">
        Marca los alimentos que tienes disponibles actualmente, que te gustan o
        que deseas que aparezcan en tu dieta. Puedes agregar otros.
      </p>

      <div className="relative flex items-center gap-4 mb-6">
        <h2 className="ft-bold text-brown">
          {category.nombre}{" "}
          <span className="text-gray ft-medium">
            (mínimo {category.minimo})
          </span>
        </h2>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="absolute bg-yellow text-brown ft-medium px-3 py-1 rounded-full shadow-md -right-50 cursor-pointer"
        >
          Otro <span className="ft-medium text-xl">+</span>
        </button>
      </div>

      {/* Ingredientes con scroll */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex flex-wrap justify-center gap-3 max-h-64 overflow-y-auto p-2">
          {category.items.map((item, index) => {
            const isSelected = selectedIngredients.includes(item.nombre);
            return (
              <button
                key={`${category.nombre}-${index}`}
                type="button"
                onClick={() => toggleSelect(item.nombre)}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl transition-all duration-300 sm:text-base cursor-pointer ft-medium ${
                  isSelected
                    ? "bg-brown text-white shadow-md scale-100"
                    : "bg-input text-gray"
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
          onClick={handleContinue}
          className="w-80 mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl cursor-pointer"
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
