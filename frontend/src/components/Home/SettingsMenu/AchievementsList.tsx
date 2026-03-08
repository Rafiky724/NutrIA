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

export default function AchievementsList({ achievements, onBack }: Props) {
  return (
    <div>
      <button
        onClick={onBack}
        className="w-full rounded-2xl bg-gray-200 p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
      >
        <img
          src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
          alt="back"
          className="w-4 h-4 rotate-180"
        />
        <h4 className="ft-light text-xs sm:text-md xl:text-lg">Volver</h4>
      </button>

      <div className="flex flex-col gap-4 mt-2">
        {achievements.map((logro, index) => {
          const isComplete = logro.current >= logro.total;

          const randomHue = 200 + ((index * 40) % 360);
          const colorLeft = `hsl(${randomHue}, 70%, 50%)`;
          const colorCard = isComplete
            ? `hsl(${randomHue}, 70%, 90%)`
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
                <h4 className="ft-medium text-xs sm:text-md text-left text-brown">
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
                  <span className="ft-medium text-sm">
                    {logro.current}/{logro.total}
                  </span>
                </div>
              </div>

              <div className="flex items-center pr-3 gap-2">
                {!isComplete && (
                  <>
                    <img src={logro.icon} alt="gem" className="w-5 h-5" />
                    <span className="ft-bold text-lg">{logro.gems}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
