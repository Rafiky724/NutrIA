import { Link } from "react-router-dom";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function Init() {
  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center ">
        <div className="min-h-screen flex flex-col items-center justify-center relative mx-auto my-auto">
          <div className="w-2xs md:w-xs 2xl:w-md mb-4">
            <img
              src="./Background/Logo.png"
              alt="Logo NutrIA"
              className="w-auto h-auto"
            />
          </div>
          <div className="text-center text-2xl ft-medium">
            <h3 className="p-6 text-gray w-[650px]">
              Tu asistente virtual personalizado para lograr tus objetivos
              nutricionales
            </h3>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <Link
              to="/Form"
              className="ft-medium bg-yellow px-15 py-2 rounded-2xl "
            >
              Empezar
            </Link>
            <small className="mt-5 text-gray ft-light opacity-95">
              ¿Tienes cuenta?{" "}
              <span className="text-brown ft-medium">
                <Link to="/Login">Inicia sesión</Link>
              </span>
            </small>
          </div>
        </div>

        <div className="absolute bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
          <FruitLeft />
        </div>
        <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
          <FruitRight />
        </div>
      </div>
    </>
  );
}
