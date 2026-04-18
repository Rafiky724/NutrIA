import { Link } from "react-router-dom";

interface MenuOption {
  label: string;
  view?: ViewType;
  link?: string;
  onClick?: () => void;
}

type ViewType = "main" | "profile" | "achievements" | "contact" | "shop";

interface Props {
  onNavigate: (view: ViewType) => void;
  onLogout: () => void;
  options?: MenuOption[];
}

export default function MainMenu({ onNavigate, onLogout, options }: Props) {
  const defaultOptions: MenuOption[] = [
    { label: "Configurar perfil", view: "profile" },
    { label: "Actualizar peso", link: "/weightUpdate" },
    { label: "Tienda", view: "shop" },
    { label: "Información de contacto", view: "contact" },
    { label: "Logros", view: "achievements" },
    { label: "Cerrar sesión", onClick: onLogout },
  ];

  const menuOptions = options || defaultOptions;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-lg flex flex-col gap-2 ml-10 md:ml-0 h-130">
          {menuOptions.map((option, index) => {
            if (option.link) {
              return (
                <Link
                  key={index}
                  to={option.link}
                  className="w-full rounded-2xl bg-input p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
                >
                  <h4 className="ft-light text-xs sm:text-md">
                    {option.label}
                  </h4>
                  <img
                    src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
                    alt="arrow"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </Link>
              );
            }

            return (
              <button
                key={index}
                onClick={() =>
                  option.onClick
                    ? option.onClick()
                    : option.view
                      ? onNavigate(option.view)
                      : undefined
                }
                className="w-full rounded-2xl bg-input p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
              >
                <h4 className="ft-light text-xs md:text-md">{option.label}</h4>
                <img
                  src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
                  alt="arrow"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
            );
          })}
        </div>

        <div className="hidden sm:block">
          <div className="w-lg xl:w-xl flex flex-col items-center">
            <object
              type="image/svg+xml"
              data="/Background/NutriaConfig.svg"
              className="w-full h-auto transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
}
