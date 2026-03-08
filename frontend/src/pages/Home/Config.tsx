import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";
import NavBar from "../../components/Home/NavBar";
import AchievementsList from "../../components/Home/SettingsMenu/AchievementsList";
import Contact from "../../components/Home/SettingsMenu/Contact";
import Shop from "../../components/Home/SettingsMenu/Shop";
import Profile from "../../components/Home/SettingsMenu/Profile";
import MainMenu from "../../components/Home/SettingsMenu/MainMenu";
import {
  achievementsData,
  categoriesData,
  contactData,
  editFields,
  shopItemsData,
} from "../../data/menu";

type ViewType = "main" | "profile" | "achievements" | "contact" | "shop";

export default function Config() {
  const navigate = useNavigate();

  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [view, setView] = useState<ViewType>("main");
  const [profileView, setProfileView] = useState<"menu" | "edit">("menu");

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

  const handleNavigate = (newView: ViewType) => {
    setView(newView);
  };

  const menuOptions = [
    { label: "Editar perfil", onClick: () => setProfileView("edit") },
    { label: "Cambiar tipo de dieta (actual)", onClick: () => {} },
    { label: "Editar objetivo", onClick: () => {} },
    { label: "Editar fecha de actualización de dieta", onClick: () => {} },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        <div className="block md:hidden">
          <NavBar
            user={homeData?.usuario}
            title={view === "shop" ? "Tienda" : "Configuraciones"}
            subtitle={
              view === "shop" ? "Compra objetos" : "Mira y edita información"
            }
          />
        </div>
        <div className="hidden md:block">
          <NavBar
            user={homeData?.usuario}
            title={view === "shop" ? "Tienda" : "Configuraciones"}
            subtitle={
              view === "shop"
                ? "Aquí puedes comprar objetos para tu mascota"
                : "Aquí puedes ver tu información y editarla"
            }
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-5 xl:mt-0 xl:h-180">
          <div className="flex items-center justify-center">
            <div className="flex flex-col bg-white w-2xs h-100 lg:w-sm lg:h-120 xl:w-lg xl:h-160 p-6 sm:p-8 rounded-3xl shadow-lg text-center ml-10 md:ml-0 max-h-160 overflow-y-auto">
              <div className="flex flex-col gap-2">
                {/* MENÚ PRINCIPAL */}
                {view === "main" && (
                  <MainMenu
                    onNavigate={handleNavigate}
                    onLogout={handleLogout}
                  />
                )}

                {/* SUBMENÚ PERFIL */}
                {view === "profile" && (
                  <Profile
                    profileView={profileView}
                    setProfileView={setProfileView}
                    onBack={() => setView("main")}
                    menuOptions={menuOptions}
                    editFields={editFields}
                  />
                )}

                {/* TIENDA */}
                {view === "shop" && (
                  <Shop
                    shopItems={shopItemsData}
                    categories={categoriesData}
                    backgroundImg="/Background/ShopCloth.svg"
                    onBack={() => setView("main")}
                  />
                )}

                {/* SUBMENÚ CONTACTO */}
                {view === "contact" && (
                  <Contact
                    contactInfo={contactData}
                    onBack={() => setView("main")}
                  />
                )}

                {/* SUBMENÚ LOGROS */}
                {view === "achievements" && (
                  <AchievementsList
                    achievements={achievementsData}
                    onBack={() => setView("main")}
                  />
                )}
              </div>
            </div>

            {!(view === "profile" && profileView === "edit") && (
              <div className="w-lg hidden sm:block ml-15 xl:ml-50">
                <div className="w-md xl:w-xl flex flex-col items-center">
                  {view === "shop" ? (
                    <>
                      <img
                        src="/Mascots/NutriaDefault.svg"
                        alt="nutria"
                        className="w-48"
                      />

                      <div className="bg-brown text-white px-6 py-2 rounded-xl mt-3">
                        <span className="ft-medium">Lionel Messi</span>
                      </div>
                    </>
                  ) : (
                    <object
                      type="image/svg+xml"
                      data={
                        view === "achievements"
                          ? "/Background/NutriaGoal.svg"
                          : view === "contact"
                            ? "/Background/NutriaAboutMe.svg"
                            : "/Background/NutriaConfig.svg"
                      }
                      className="w-full h-auto"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
