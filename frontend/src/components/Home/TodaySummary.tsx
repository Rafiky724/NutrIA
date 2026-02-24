import type { HomeResponse } from "../../types";

type Props = {
  homeData: HomeResponse | null;
};

export default function TodaySummary({ homeData }: Props) {
  const quantityDays = 7;
  const today = new Date();
  const daysBefore = 2;
  const daysWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const daysLetter: string[] = [];
  const numbersDays: number[] = [];
  const currentday = homeData?.dia_actual;
  const macros = homeData?.macros_consumidos_hoy;
  for (let i = 0; i < quantityDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - daysBefore + i);
    daysLetter.push(daysWeek[date.getDay()]);
    numbersDays.push(date.getDate());
  }

  const caloriesTotal = currentday?.calorias_totales || 0;
  const proteinsTotal = currentday?.proteinas_totales || 0;
  const carbohydratesTotal = currentday?.carbohidratos_totales || 0;
  const fatsTotal = currentday?.grasas_totales || 0;

  return (
    <div className="flex flex-col bg-white rounded-3xl p-4 md:p-6 shadow gap-4 ml-10 w-2xs md:w-sm h-95">
      <div className="flex justify-center gap-2">
        <img
          src="/SVG/IconsGeneral/CalendarIcon.svg"
          alt="Calendario"
          className="w-4 md:w-5 h-4 md:h-5"
        />
        <span className="ft-bold text-brown text-xs md:text-sm">Hoy</span>
      </div>

      <div className="flex justify-between text-xs md:text-sm text-gray mt-2">
        {daysLetter.map((d, idx) => {
          const estado =
            homeData?.macros_consumidos_hoy.seguimiento_racha?.[idx];

          let bordeColor = "br-gray";
          if (estado === 1) bordeColor = "br-green";
          else if (estado === 0) bordeColor = "br-yellow";
          else if (estado === -1) bordeColor = "br-red";

          return (
            <div
              key={idx}
              className="flex flex-col items-center ft-light text-gray"
            >
              <span>{d}</span>
              <span
                className={`flex items-center justify-center mt-1 ft-medium text-gray w-6 md:w-8 h-6 md:h-8 rounded-lg md:rounded-xl border-3 ${bordeColor}`}
              >
                {numbersDays[idx]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex mt-4 gap-4 md:gap-6 items-center">
        <div className="relative w-35 md:w-45 h-35 md:h-45 flex items-center justify-center bg-white rounded-full">
          <span className="absolute text-center text-sm ft-light text-gray">
            {caloriesTotal}/{macros?.calorias_objetivo}
            <br />
            kcal
          </span>
          <div className="w-full h-full rounded-full border-8 border-yellow-500 border-t-gray-200 animate-spin-slow"></div>
        </div>

        <div className="flex flex-col items-center md:justify-center gap-6 flex-1">
          {["Proteínas", "Carbohidratos", "Grasas"].map((macro, idx) => {
            const value =
              [proteinsTotal, carbohydratesTotal, fatsTotal][idx] || 0;
            const max =
              [
                macros?.proteinas_objetivo,
                macros?.carbohidratos_objetivo,
                macros?.grasas_objetivo,
              ][idx] || 100;
            const percentage = Math.min((value / max) * 100, 100);
            return (
              <div key={macro}>
                <div className="flex md:justify-between text-xs ft-light text-gray w-20 flex-col text-center md:flex-row md:text-left">
                  <span>{macro}</span>
                  <span>
                    {Math.round(value)}/{max} g
                  </span>
                </div>
                <div className="w-full bg-gray h-1 md:h-2 rounded-full mt-1">
                  <div
                    className="h-1 md:h-2 bg-yellow rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4 md:mt-0">
        <span className="w-3 h-3 rounded-full bg-yellow"></span>
        <span className="w-3 h-3 rounded-full bg-gray"></span>
      </div>
    </div>
  );
}
