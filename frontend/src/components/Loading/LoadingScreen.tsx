import React, { type FC } from "react";
import "./LoadingScreen.css";

type LoadingScreenProps = {
  title?: string;
  subtitle?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const LoadingScreen: FC<LoadingScreenProps> = ({
  title = "CARGANDO",
  subtitle = "Esto puede tardar unos segundos.\nEstamos creando tu dieta personalizada",
  Icon,
}) => {
  return (
    <div className="loading-screen">
      <div className="loading-center">
        <div className="loading-icon">
          <Icon />
        </div>

        <h1 className="loading-title">{title}</h1>

        <p className="loading-subtitle">
          {subtitle.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
