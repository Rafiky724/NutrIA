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
      className="relative bg-input ft-medium px-4 py-3 rounded-4xl cursor-pointer flex justify-center items-center text-gray text-sm"
      onClick={toggleDropdown}
    >
      <span>
        {activeDish.tipo_comida} - {activeDish.hora_sugerida || "—"}
      </span>

      <div className="absolute right-4 w-4">
        <img
          className="w-auto h-auto"
          src="/SVG/IconsGeneral/DropdownIcon.svg"
          alt="Icono desplegable"
        />
      </div>

      {dropdownOpen && (
        <div className="absolute w-full bg-input rounded-2xl shadow-lg p-2 top-13">
          {dayPlan.comidas.map((com) => (
            <div
              key={com.tipo_comida}
              className="p-1 hover:bg-gray-400 rounded-xl cursor-pointer text-sm"
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
