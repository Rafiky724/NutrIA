import React, { type FC } from "react";
import "./LoadingScreen.css";
import FruitLeft from "../Decoration/FruitLeft";
import FruitRight from "../Decoration/FruitRight";

type LoadingScreenProps = {
  title?: string;
  subtitle?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const LoadingScreen: FC<LoadingScreenProps> = ({
  title = "CARGANDO",
  subtitle = "Esto puede tardar unos segundos.\nEstamos creando tu dieta personalizada.",
  Icon,
}) => {
  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden z-50">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Icono */}
        <div className="mb-6 w-16 sm:w-20 md:w-24 animate-pulse">
          <Icon className="w-full h-auto" />
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl ft-bold text-brown mb-6">
          {title}
        </h1>

        {/* Subtítulo */}
        <p className="max-w-xs sm:max-w-md md:max-w-xl text-base sm:text-lg md:text-xl ft-medium text-gray leading-relaxed">
          {subtitle.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Decoraciones */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-72">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-72">
        <FruitRight />
      </div>
    </div>
  );
};

export default LoadingScreen;
