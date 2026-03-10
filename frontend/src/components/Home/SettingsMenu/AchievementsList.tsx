type Achievement = {
  title: string;
  current: number;
  total: number;
  gems: number;
  icon: string;
  color?: string;
};

type Props = {
  achievements: Achievement[];
  onBack: () => void;
};

function lightenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + percent);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent);
  const b = Math.min(255, (num & 0xff) + percent);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function AchievementsList({ achievements, onBack }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-130 overflow-y-auto">
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

          <div className="flex flex-col gap-4 w-full">
            {achievements.map((logro, index) => {
              const isComplete = logro.current >= logro.total;
              const baseColor = logro.color || "#f2f0eb";
              const colorLeft = baseColor;
              const colorCard = isComplete
                ? lightenColor(baseColor, 120)
                : "#f2f0eb";

              return (
                <div
                  key={index}
                  className="relative flex items-center overflow-hidden rounded-3xl shadow-lg transition hover:scale-105 cursor-pointer"
                  style={{ minHeight: "60px", backgroundColor: colorCard }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-6 rounded-l-2xl"
                    style={{ backgroundColor: colorLeft }}
                  ></div>

                  <div className="flex-1 flex flex-col p-3 pl-8 overflow-hidden">
                    <h4 className="ft-bold text-xs sm:text-md text-left text-brown italic">
                      {logro.title}
                    </h4>

                    <div className="flex items-center mt-2 gap-2 md:w-[200px] xl:w-[250px]">
                      <div className="flex-1 h-3 bg-inputs rounded-full overflow-hidden border br-brown">
                        <div
                          className="h-3 bg-brown transition-all duration-500"
                          style={{
                            width: `${Math.min((logro.current / logro.total) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ft-medium text-xs md:text-sm text-gray">
                        {logro.current}/{logro.total}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center pr-2 md:pr-5 gap-1.5">
                    {!isComplete && (
                      <>
                        <img
                          src={logro.icon}
                          alt="gem"
                          className="w-4 md:w-5 h-4 md:h-5"
                        />
                        <span className="ft-bold text-md md:text-lg">
                          {logro.gems}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="w-lg xl:w-2xl flex flex-col items-center">
            <object
              type="image/svg+xml"
              data="/Background/NutriaGoal.svg"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
