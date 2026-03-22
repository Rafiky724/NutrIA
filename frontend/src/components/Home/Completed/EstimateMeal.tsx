type Props = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export default function EstimateMeal({ isOpen, onClose, onContinue }: Props) {
  if (!isOpen) return null;

  const data = [
    { label: "Proteína", value: 14.8, color: "bg-yellow-500" },
    { label: "Carbs", value: 9.8, color: "bg-yellow-700" },
    { label: "Grasas", value: 16.8, color: "bg-yellow-900" },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  const protein = 10;
  const carbs = 10;
  const fats = 20;
  const calories = 50;

  const total = protein + carbs + fats;
  const proteinDeg = (protein / total) * 360;
  const carbsDeg = (carbs / total) * 360;

  const gradient = `conic-gradient(
    #F59E0B 0deg ${proteinDeg}deg,
    #B45309 ${proteinDeg}deg ${proteinDeg + carbsDeg}deg,
    #78350F ${proteinDeg + carbsDeg}deg 360deg
  )`;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 flex flex-col gap-6 w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg ft-bold text-brown">
          Estimación aproximada
        </h2>

        <div className="flex flex-col gap-4">
          <div className="h-32 rounded-xl flex items-center justify-center">
            <div className="w-15 xl:w-25 h-25 xl:h-25 relative flex items-center justify-center">
              <div
                className="w-full h-full rounded-full"
                style={{ background: gradient }}
              ></div>

              <div className="absolute w-10 xl:w-20 h-10 xl:h-20 bg-white rounded-full flex items-center justify-center text-sm ft-medium text-brown text-center">
                {calories} <br />
                Kcal
              </div>
            </div>
          </div>

          <div className="h-32 rounded-xl flex items-end justify-center gap-8">
            {data.map((item, idx) => {
              const heightPercent = (item.value / maxValue) * 100;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-end"
                >
                  <div className="h-20 w-10 flex items-end">
                    <div
                      className={`w-lg ${item.color} transition-all duration-500`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <div className="flex flex-col mt-2 items-center">
                    <span className="text-xs ft-medium text-brown">
                      {item.value}g (19%)
                    </span>
                    <span className="text-[10px] text-center text-gray ft-light">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="w-3xs mx-auto bg-yellow text-brown py-2 rounded-4xl mt-4 ft-medium text-xs hover:scale-105 transition cursor-pointer"
          onClick={onContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
