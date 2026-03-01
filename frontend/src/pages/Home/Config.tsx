import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";
import NavBar from "../../components/Home/NavBar";

export default function Config() {
  const navigate = useNavigate();

  const [homeData, setHomeData] = useState<HomeResponse | null>(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        {/* NavBar */}
        <div className="block md:hidden">
          <NavBar
            user={homeData?.usuario}
            subtitle="Estás en configuraciones"
          />
        </div>
        <div className="hidden md:block">
          <NavBar
            title="Configuraciones"
            subtitle="Aquí puedes ver tu información y editarla"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-5 xl:mt-0 xl:h-180">
          <div className="flex items-center justify-center">
            <div className="flex flex-col bg-white w-2xs h-100 lg:w-sm lg:h-120 xl:w-lg xl:h-160 p-6 sm:p-8 rounded-3xl shadow-lg text-center ml-10 md:ml-0">
              <div className="flex flex-col gap-4">
                <button className="w-full rounded-2xl cursor-pointer bg-input p-2 transition hover:scale-105">
                  <h4 className="ft-medium text-left text-xs sm:text-md xl:text-lg">
                    Configurar perfil
                  </h4>
                </button>

                <button className="w-full rounded-2xl cursor-pointer bg-input p-2 transition hover:scale-105">
                  <h4 className="ft-medium text-left text-xs sm:text-md xl:text-lg">
                    Actualizar peso
                  </h4>
                </button>

                <button className="w-full rounded-2xl cursor-pointer bg-input p-2 transition hover:scale-105">
                  <h4 className="ft-medium text-left text-xs sm:text-md xl:text-lg">
                    Tienda
                  </h4>
                </button>
                <button className="w-full rounded-2xl cursor-pointer bg-input p-2 transition hover:scale-105">
                  <h4 className="ft-medium text-left text-xs sm:text-md xl:text-lg">
                    Información de contacto
                  </h4>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full rounded-2xl cursor-pointer bg-input p-2 transition hover:scale-105"
                >
                  <h4 className="ft-medium text-left text-xs sm:text-md xl:text-lg">
                    Logros
                  </h4>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl cursor-pointer bg-input p-2 transition hover:scale-105"
                >
                  <h4 className="ft-medium text-left text-xs sm:text-md xl:text-lg">
                    Cerrar sesión
                  </h4>
                </button>
              </div>
            </div>

            <div className="w-lg hidden sm:block ml-15 xl:ml-50">
              <div className="w-md xl:w-xl">
                <object
                  type="image/svg+xml"
                  data="/Background/NutriaConfig.svg"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
