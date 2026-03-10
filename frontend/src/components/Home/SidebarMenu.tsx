import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../../data/menuItems";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white rounded-tr-3xl rounded-br-3xl p-3 shadow-md fixed top-50 left-0 z-50">
      <div className="flex flex-col gap-6 -ml-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const theme = isActive ? "Light" : "Dark";
          const iconSrc = `/SVG/Menu/${theme}/${item.nombre}.svg`;

          return (
            <div
              key={idx}
              className="mx-auto cursor-pointer w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              onClick={() => navigate(item.path)}
              title={item.alt}
            >
              <img src={iconSrc} alt={item.alt} className="w-5 h-5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
