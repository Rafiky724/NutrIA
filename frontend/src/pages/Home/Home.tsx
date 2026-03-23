import { useState, useEffect } from "react";

import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";
import NavBar from "../../components/Home/NavBar";
import TodaySummary from "../../components/Home/TodaySummary";
import NextMealCard from "../../components/Home/NextMealCard";
import DailyDiet from "../../components/Home/DailyDiet";
import RachaWarning from "../../components/Home/Completed/RachaWarning";
import WarningDay from "../../components/Home/Completed/WarningDay";
import ExcelentDay from "../../components/Home/Completed/ExcelentDay";
import FailedDay from "../../components/Home/Completed/FailedDay";

export default function Home() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [activeFoodIndex, setActiveFoodIndex] = useState(0);
  const [openRachaWarningModal, setOpenRachaWarningModal] = useState(false);
  const [openWarningDayModal, setOpenWarningDayModal] = useState(false);
  const [openExcelentDayModal, setOpenExcelentDayModal] = useState(false);
  const [openFailedDayModal, setOpenFailedDayModal] = useState(false);

  const hayDietaHoy = !!homeData?.dia_actual?.comidas?.length;

  console.log(homeData);

  const fetchHomeData = async () => {
    try {
      const data = await HomeService.getHome();
      setHomeData(data);
      if (data.modals.mostrar_pagar_racha) {
        setOpenRachaWarningModal(true);
      }
      if (data.modals.mostrar_subir_racha) {
        setOpenExcelentDayModal(true);
      }
      if (data.modals.mostrar_perder_racha) {
        setOpenFailedDayModal(true);
      }
      if (data.modals.mostrar_notificar_racha) {
        setOpenWarningDayModal(true);
      }
    } catch (err) {
      console.error("Error al cargar datos del home", err);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (!homeData) {
    return;
  }

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        <NavBar user={homeData?.usuario} />

        <div className="max-w-5xl mx-auto flex gap-4 md:gap-6 flex-col md:flex-row items-center justify-center">
          <TodaySummary homeData={homeData} />

          <NextMealCard
            homeData={homeData}
            nextFood={homeData?.proxima_comida}
            estado={homeData?.proxima_comida?.estado}
            onRefetch={fetchHomeData}
            activeFoodIndex={activeFoodIndex}
          />
        </div>

        <div className="max-w-5xl mx-auto flex gap-4 md:gap-6 flex-col md:flex-row items-center justify-center">
          <DailyDiet
            homeData={homeData}
            activeFoodIndex={activeFoodIndex}
            setActiveFoodIndex={setActiveFoodIndex}
            onRefetch={fetchHomeData}
          />
        </div>

        {!hayDietaHoy && homeData && (
          <div className="flex justify-center items-center h-full text-center text-sm md:text-lg font-semibold">
            {homeData?.mensaje || "No tienes dieta asignada hoy"}
          </div>
        )}
      </div>

      <RachaWarning
        isOpen={openRachaWarningModal}
        onClose={() => setOpenRachaWarningModal(false)}
        onRefetch={fetchHomeData}
      />

      <WarningDay
        isOpen={openWarningDayModal}
        onClose={() => setOpenWarningDayModal(false)}
        onRefetch={fetchHomeData}
      />

      <ExcelentDay
        isOpen={openExcelentDayModal}
        onClose={() => setOpenExcelentDayModal(false)}
        onRefetch={fetchHomeData}
      />

      <FailedDay
        isOpen={openFailedDayModal}
        onClose={() => setOpenWarningDayModal(false)}
        onRefetch={fetchHomeData}
      />
    </div>
  );
}
