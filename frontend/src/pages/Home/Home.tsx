import { useState, useEffect } from "react";

import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";
import NavBar from "../../components/Home/NavBar";
import TodaySummary from "../../components/Home/TodaySummary";
import NextMealCard from "../../components/Home/NextMealCard";
import DailyDiet from "../../components/Home/DailyDiet";

export default function Home() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [activeFoodIndex, setActiveFoodIndex] = useState(0);

  const hayDietaHoy = !!homeData?.dia_actual?.comidas?.length;

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await HomeService.getHome();
        setHomeData(data);
      } catch (err) {
        console.error("Error al cargar datos del home", err);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        <NavBar user={homeData?.usuario} />

        <div className="flex gap-4 md:gap-6 flex-col md:flex-row items-center justify-center">
          <TodaySummary homeData={homeData} />

          <NextMealCard nextFood={homeData?.proxima_comida} />
        </div>

        <div className="flex gap-4 md:gap-6 flex-col md:flex-row items-center justify-center">
          <DailyDiet
            homeData={homeData}
            activeFoodIndex={activeFoodIndex}
            setActiveFoodIndex={setActiveFoodIndex}
          />
        </div>

        {!hayDietaHoy && homeData && (
          <div className="flex justify-center items-center h-full text-center text-sm md:text-lg font-semibold">
            {homeData?.mensaje || "No tienes dieta asignada hoy"}
          </div>
        )}
      </div>
    </div>
  );
}
