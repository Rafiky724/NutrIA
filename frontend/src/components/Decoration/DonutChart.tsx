interface Props {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export default function DonutChart({ protein, carbs, fats, calories }: Props) {
  const total = protein + carbs + fats;
  const proteinDeg = (protein / total) * 360;
  const carbsDeg = (carbs / total) * 360;

  const gradient = `conic-gradient(
    #F59E0B 0deg ${proteinDeg}deg,
    #B45309 ${proteinDeg}deg ${proteinDeg + carbsDeg}deg,
    #78350F ${proteinDeg + carbsDeg}deg 360deg
  )`;

  return (
    <div className="w-25 h-25 relative flex items-center justify-center">
      {/* Donut externo */}
      <div
        className="w-full h-full rounded-full"
        style={{ background: gradient }}
      ></div>

      {/* Círculo interior */}
      <div className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center text-sm ft-medium text-brown">
        {calories} <br />
        Kcal
      </div>
    </div>
  );
}
