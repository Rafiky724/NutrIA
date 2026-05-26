import { Outlet, useNavigate } from "react-router-dom";

import SidebarMenu from "../../components/Home/SidebarMenu";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { useEffect, useState } from "react";
import { getHasPlan } from "../../services/userService";

export default function HomeLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMascota = async () => {
      try {
        const data = await getHasPlan();

        if (!data?.tiene_plan) {
          navigate("/startDiet", { replace: true });
          return;
        }

        if (!data?.tiene_mascota) {
          navigate("/adoptMoment", { replace: true });
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkMascota();
  }, [navigate]);

  if (loading) {
    return (
      <LoadingScreen
        title="CARGANDO"
        subtitle="Verificando mascota..."
        loading={loading}
      />
    );
  }

  return (
    <>
      <SidebarMenu />
      <Outlet />
    </>
  );
}
