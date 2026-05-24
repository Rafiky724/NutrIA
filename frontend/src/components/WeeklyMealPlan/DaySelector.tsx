import type { Dispatch, SetStateAction } from "react";
import type { Days } from "../../types";

type Props = {
  days: Days[];
  dayActive: Days;
  setDayActive: Dispatch<SetStateAction<Days>>;
};

export default function DaySelector({ days, dayActive, setDayActive }: Props) {
  const shortDays: Record<string, string> = {
    Lunes: "L",
    Martes: "M",
    Miercoles: "M",
    Jueves: "J",
    Viernes: "V",
    Sabado: "S",
    Domingo: "D",
  };

  return (
    <div className="flex flex-row gap-2 justify-between mb-4">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setDayActive(day)}
          className={`px-3 sm:px-4 md:px-10 py-1 rounded-4xl ft-medium transition-all ${
            dayActive === day
              ? "bg-yellow text-brown shadow"
              : "bg-input text-gray"
          } cursor-pointer text-sm md:text-md hover:scale-105`}
        >
          <span className="block xl:hidden">{shortDays[day] || day}</span>

          <span className="hidden xl:block">{day}</span>
        </button>
      ))}
    </div>
  );
}
