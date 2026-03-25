import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";
import NavBar from "../../components/Home/NavBar";
import AchievementsList from "../../components/Home/SettingsMenu/AchievementsList";
import Contact from "../../components/Home/SettingsMenu/Contact";
import Shop from "../../components/Home/SettingsMenu/Shop";
import Profile from "../../components/Home/SettingsMenu/Profile";
import MainMenu from "../../components/Home/SettingsMenu/MainMenu";

type ViewType = "main" | "profile" | "achievements" | "contact" | "shop";

export default function Config() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [searchParams] = useSearchParams();
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
    navigate(`/config?view=${newView}`);
  };

  useEffect(() => {
    const viewFromUrl = (searchParams.get("view") as ViewType) || "main";
    const modeFromUrl = (searchParams.get("mode") as "menu" | "edit") || "menu";

    setView(viewFromUrl);

    if (viewFromUrl === "profile") {
      setProfileView(modeFromUrl);
    }
  }, [searchParams]);

  const handleProfileNavigation = (mode: "menu" | "edit") => {
    setView("profile");
    setProfileView(mode);
    navigate(`/config?view=profile&mode=${mode}`);
  };

  const menuOptions = [
    { label: "Editar perfil", onClick: () => handleProfileNavigation("edit") },
    {
      label: "Cambiar tipo de dieta",
      onClick: () => navigate("/updateTypeDiet"),
    },
    { label: "Editar objetivo", onClick: () => navigate("/objetive") },
    {
      label: "Editar fecha de actualización de dieta",
      onClick: () => navigate("/updateDate"),
    },
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

        <div className="flex flex-col md:flex-row items-center justify-center">
          {view === "main" && (
            <MainMenu onNavigate={handleNavigate} onLogout={handleLogout} />
          )}
          {view === "profile" && (
            <Profile
              profileView={profileView}
              setProfileView={setProfileView}
              onBack={() => handleNavigate("main")}
              onGoToShop={() => handleNavigate("shop")}
              menuOptions={menuOptions}
            />
          )}
          {view === "shop" && <Shop />}
          {view === "contact" && (
            <Contact onBack={() => handleNavigate("main")} />
          )}
          {view === "achievements" && (
            <AchievementsList onBack={() => handleNavigate("main")} />
          )}
        </div>
      </div>
    </div>
  );
}
