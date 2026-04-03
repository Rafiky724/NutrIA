import "./LoadingScreen.css";
import FruitLeft from "../Decoration/FruitLeft";
import FruitRight from "../Decoration/FruitRight";
import { useEffect, useState } from "react";
import { nutritionFacts } from "../../data/nutritionFacts";

type Props = {
  title?: string;
  subtitle?: string;
  icon?: string;
  loading?: boolean;
};

export default function LoadingScreen({
  title = "CARGANDO",
  subtitle = "Esto puede tardar unos minutos.\nEstamos creando tu dieta personalizada.",
  icon = "/LoadingIcon.svg",
  loading,
}: Props) {
  const [currentSubtitle, setCurrentSubtitle] = useState(subtitle);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let lastIndex = -1;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        let newIndex;

        do {
          newIndex = Math.floor(Math.random() * nutritionFacts.length);
        } while (newIndex === lastIndex);

        lastIndex = newIndex;
        setCurrentSubtitle(nutritionFacts[newIndex]);
        setFade(true);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 80);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        setProgress(100);
      }, 300);
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden z-50">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="mb-6 w-30 xl:w-xs">
          <object type="image/svg+xml" data={icon} className="w-full h-auto" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl ft-bold text-brown mb-4 flex gap-1 justify-center">
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-float"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="w-full max-w-xs sm:max-w-md h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-yellow transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p
          className={`max-w-xs sm:max-w-md md:max-w-xl text-base sm:text-lg md:text-xl ft-medium text-gray leading-relaxed transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentSubtitle.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
