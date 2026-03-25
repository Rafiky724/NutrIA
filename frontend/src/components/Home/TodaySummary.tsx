import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { HomeResponse } from "../../types";

type Props = {
  homeData: HomeResponse | null;
};

export default function TodaySummary({ homeData }: Props) {
  const quantityDays = 7;
  const today = new Date();
  const daysBefore = 2;
  const daysWeek = ["L", "M", "M", "J", "V", "S", "D"];
  const daysLetter: string[] = [];
  const numbersDays: number[] = [];

  for (let i = 0; i < quantityDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - daysBefore + i);
    daysLetter.push(daysWeek[date.getDay()]);
    numbersDays.push(date.getDate());
  }

  if (!homeData || !homeData.macros_consumidos_hoy) {
    return (
      <div className="flex flex-col bg-white rounded-3xl p-4 md:p-6 shadow gap-4 ml-10 w-2xs md:w-sm h-95">
        {/* Header */}
        <div className="flex justify-center gap-2">
          <Skeleton circle width={20} height={20} />
          <Skeleton width={40} height={16} />
        </div>

        {/* Calendario */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton width={10} height={10} />
              <Skeleton width={30} height={30} borderRadius={8} />
            </div>
          ))}
        </div>

        {/* Calorías */}
        <div className="flex mt-4 gap-4 md:gap-6 items-center">
          <Skeleton circle width={140} height={140} />

          {/* Macros */}
          <div className="flex flex-col gap-6 flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton width={80} height={12} />
                <Skeleton height={8} style={{ marginTop: 4 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const macrosData = [
    {
      label: "Proteínas",
      value: homeData.macros_consumidos_hoy.proteinas,
      max: homeData.macros_consumidos_hoy.proteinas_objetivo || 0,
      unit: "g",
    },
    {
      label: "Carbohidratos",
      value: homeData.macros_consumidos_hoy.carbohidratos,
      max: homeData.macros_consumidos_hoy.carbohidratos_objetivo || 0,
      unit: "g",
    },
    {
      label: "Grasas",
      value: homeData.macros_consumidos_hoy.grasas,
      max: homeData.macros_consumidos_hoy.grasas_objetivo || 0,
      unit: "g",
    },
  ].map((item) => ({
    ...item,
    percentage: item.max ? Math.min((item.value / item.max) * 100, 100) : 0,
  }));

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
            homeData.macros_consumidos_hoy.seguimiento_racha?.[idx];

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
            {homeData.macros_consumidos_hoy.calorias}/
            {homeData.macros_consumidos_hoy.calorias_objetivo}
            <br />
            kcal
          </span>
          <div className="w-full h-full rounded-full border-8 border-yellow-500 border-t-gray-200 animate-spin-slow"></div>
        </div>

        <div className="flex flex-col items-center md:justify-center gap-6 flex-1">
          {macrosData.map((macro) => (
            <div key={macro.label}>
              <div className="flex flex-col text-xs ft-light text-gray w-20 text-center md:text-left items-center">
                <span>{macro.label}</span>
                <span>
                  {macro.value.toFixed(2)}/{macro.max} {macro.unit}
                </span>
              </div>

              <div className="w-full bg-gray h-1 md:h-2 rounded-full mt-1">
                <div
                  className="h-1 md:h-2 bg-yellow rounded-full"
                  style={{ width: `${macro.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
