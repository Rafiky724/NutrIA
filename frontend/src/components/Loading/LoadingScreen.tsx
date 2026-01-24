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
    <div className="relative loading-screen h-screen">
      <div className="loading-center flex flex-col items-center justify-center h-full">
        <div className="loading-icon mx-auto">
          <Icon />
        </div>

        <h1 className="loading-title text-center text-3xl">{title}</h1>

        <p className="w-md text-center text-xl ft-medium text-gray absolute bottom-20 ">
          {subtitle.split("").map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </p>
      </div>

      <div className="absolute left-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitLeft />
      </div>

      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitRight />
      </div>
    </div>
  );
};

export default LoadingScreen;
