import type { MenuOption } from "./Profile";

type Props = {
  onBack: () => void;
  menuOptions: MenuOption[];
};

export default function ProfileMenu({ onBack, menuOptions }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:px-12 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-130 overflow-y-auto">
          <button
            onClick={onBack}
            className="w-full rounded-4xl bg-gray-200 p-2 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
          >
            <img
              src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
              alt="back"
              className="w-4 h-4 rotate-180"
            />
            <h4 className="ft-medium text-xs sm:text-md">Volver</h4>
          </button>

          <div className="flex flex-col gap-2">
            {menuOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.onClick}
                className="w-full rounded-2xl bg-input p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
              >
                <h4 className="ft-light text-xs sm:text-md xl:text-lg">
                  {option.label}
                </h4>
                <img
                  src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
                  alt="arrow"
                  className="w-4 h-4"
                />
              </button>
            ))}
          </div>
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
