import { Link } from "react-router-dom";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function Init() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="w-40 sm:w-52 md:w-64 2xl:w-80 mb-6">
          <img
            src="./Background/Logo.png"
            alt="Logo NutrIA"
            className="w-full h-auto"
          />
        </div>

        {/* Texto */}
        <h3 className="text-gray text-lg sm:text-xl md:text-2xl ft-medium max-w-xs sm:max-w-md md:max-w-xl leading-relaxed">
          Tu asistente virtual personalizado para lograr tus objetivos
          nutricionales
        </h3>

        {/* Botones */}
        <div className="mt-10 flex flex-col items-center w-full max-w-xs">
          <Link
            to="/form"
            className="ft-medium bg-yellow w-full py-3 rounded-2xl text-center hover:scale-105 transition"
          >
            Empezar
          </Link>

          <small className="mt-5 text-gray ft-light opacity-95 text-sm">
            ¿Tienes cuenta?{" "}
            <Link to="/login" className="text-brown ft-medium hover:underline">
              Iniciar sesión
            </Link>
          </small>
        </div>
      </div>

      {/* Decoraciones */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
