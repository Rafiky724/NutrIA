import type { Dispatch, SetStateAction } from "react";
import type { Days } from "../../types";

type Props = {
  days: Days[];
  dayActive: Days;
  setDayActive: Dispatch<SetStateAction<Days>>;
};

export default function DaySelector({ days, dayActive, setDayActive }: Props) {
  return (
    <>
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setDayActive(day)}
          className={`px-5 mb-5 py-1 rounded-4xl ft-medium transition ${
            dayActive === day
              ? "bg-yellow text-brown shadow"
              : "bg-input text-gray"
          } cursor-pointer`}
        >
          {day}
        </button>
      ))}
    </>
  );
}
