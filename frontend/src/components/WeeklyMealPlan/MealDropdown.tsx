import { useState, useEffect, useRef } from "react";
import type { DayPlan, TypeFood } from "../../types";

type Props = {
  dayPlan: DayPlan;
  foodActive: TypeFood;
  setFoodActive: (food: TypeFood) => void;
};

export default function MealDropdown({
  dayPlan,
  foodActive,
  setFoodActive,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeDish = dayPlan.comidas.find((c) => c.tipo_comida === foodActive);

  if (!activeDish) return null;

  const handleSelectFood = (food: TypeFood) => {
    setFoodActive(food);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className="relative bg-input ft-medium px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-4xl cursor-pointer flex justify-between items-center text-gray text-xs w-full md:w-50 mx-auto"
    >
      <div className="w-full flex justify-between items-center">
        <span>
          {activeDish.tipo_comida} - {activeDish.hora_sugerida || "—"}
        </span>

        <div className="ml-2 w-4 flex-shrink-0">
          <img
            className="w-auto h-auto"
            src="/SVG/IconsGeneral/DropdownIcon.svg"
            alt="Icono desplegable"
          />
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute w-full max-w-xs sm:max-w-sm md:max-w-md bg-input rounded-2xl shadow-lg mt-1 top-full z-50 -mx-4.5 md:-mx-5.5">
          {dayPlan.comidas.map((com) => (
            <div
              key={com.tipo_comida}
              className="p-2 hover:bg-gray-300 rounded-xl cursor-pointer text-xs w-full md:w-50"
              onClick={() => handleSelectFood(com.tipo_comida as TypeFood)}
            >
              {com.tipo_comida} — {com.hora_sugerida || "—"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
