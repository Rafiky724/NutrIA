import { useState, useEffect } from "react";

import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";
import NavBar from "../../components/Home/NavBar";
import TodaySummary from "../../components/Home/TodaySummary";
import NextMealCard from "../../components/Home/NextMealCard";
import DailyDiet from "../../components/Home/DailyDiet";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import LoadingIcon from "../../assets/Loading/LoadingIcon.svg?react";

export default function Home() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFoodIndex, setActiveFoodIndex] = useState(0);
  const hayDietaHoy = !!homeData?.dia_actual?.comidas?.length;

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await HomeService.getHome();
        setHomeData(data);
      } catch (err) {
        console.error("Error al cargar datos del home", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading || !homeData)
    return (
      <LoadingScreen
        Icon={LoadingIcon}
        title="CARGANDO"
        subtitle={`Esto puede tardar unos segundos.\nEstamos trayendo tus datos.`}
      />
    );

  if (!hayDietaHoy) {
    return (
      <div className="flex min-h-screen bg-input pl-10 md:pl-20 justify-center">
        <div className="w-screen flex flex-col p-6">
          <NavBar user={homeData.usuario} />
          <div className="flex justify-center items-center h-full text-center text-lg font-semibold">
            {homeData.mensaje || "No tienes dieta asignada hoy"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        <NavBar user={homeData.usuario} />

        <div className="flex gap-4 md:gap-6 flex-col md:flex-row items-center">
          {/* CAJA IZQUIERDA */}
          <TodaySummary homeData={homeData} />

          {/* CAJA DERECHA */}
          <NextMealCard nextFood={homeData.proxima_comida} />
        </div>

        {/* CAJA INFERIOR */}
        <DailyDiet
          homeData={homeData}
          activeFoodIndex={activeFoodIndex}
          setActiveFoodIndex={setActiveFoodIndex}
        />
      </div>
    </div>
  );
}
