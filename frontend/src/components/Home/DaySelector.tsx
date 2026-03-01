import type { Dispatch, SetStateAction } from "react";
import type { Days } from "../../types";

type Props = {
  days: Days[];
  dayActive: Days;
  setDayActive: Dispatch<SetStateAction<Days>>;
};

export default function DaySelector({ days, dayActive, setDayActive }: Props) {
  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between mb-4">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setDayActive(day)}
          className={`md:w-[120px] xl:w-[200px] px-3 sm:px-4 md:px-5 py-1 rounded-4xl ft-medium transition-all ${
            dayActive === day
              ? "bg-yellow text-brown shadow"
              : "bg-input text-gray"
          } cursor-pointer text-sm md:text-md hover:scale-105 transition`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
