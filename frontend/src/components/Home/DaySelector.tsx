import type { Dispatch, SetStateAction } from "react";
import type { Days } from "../../types";

type Props = {
  days: Days[];
  dayActive: Days;
  setDayActive: Dispatch<SetStateAction<Days>>;
};

export default function DaySelector({ days, dayActive, setDayActive }: Props) {
  const daysIndex: Record<Days, number> = {
    Lunes: 0,
    Martes: 1,
    Miercoles: 2,
    Jueves: 3,
    Viernes: 4,
    Sabado: 5,
    Domingo: 6,
  };

  const today = new Date();
  const jsDay = today.getDay();
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between mb-4">
      {days.map((day) => {
        const dayIdx = daysIndex[day];

        let bgClass = "bg-input text-gray";
        if (day === dayActive) {
          bgClass = "bg-yellow text-brown shadow";
        } else if (dayIdx < todayIndex) {
          bgClass = "bg-gray-300 text-gray";
        }

        return (
          <button
            key={day}
            onClick={() => setDayActive(day)}
            className={`md:w-[120px] xl:w-[200px] px-3 sm:px-4 md:px-5 py-1 rounded-4xl ft-medium transition-all ${bgClass} cursor-pointer text-sm md:text-md hover:scale-105`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}
