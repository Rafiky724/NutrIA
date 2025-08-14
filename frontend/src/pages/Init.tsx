import { Link } from "react-router-dom";

export default function Init() {
  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center ">
        <div className="min-h-screen flex flex-col items-center justify-center relative mx-auto my-auto">
          <div className="w-sm md:w-md">
            <img src="./Logo.png" alt="Logo NutrIA" className="w-auto h-auto" />
          </div>
          <div className="text-center poppins-medium text-3xl">
            <h3 className="p-4 font_brown">
              Tu asistente virtual personalizado para lograr tus objetivos
              nutricionales
            </h3>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <Link
              to="/Form"
              className="bg_yellow px-15 py-3 rounded-3xl font-semibold"
            >
              Empezar
            </Link>
            <small className="mt-5 font_brown poppins-light opacity-95">
              ¿Tienes cuenta?{" "}
              <span className="poppins-medium">
                <Link to="/Login">Inicia sesión</Link>
              </span>
            </small>
          </div>
        </div>

        <div className="absolute bottom-0 z-10 w-35 sm:w-3xs ">
          <img
            src="/Background/FrutaBack1.png"
            alt="Logo NutrIA"
            className="w-auto h-auto"
          />
        </div>

        <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-3xs">
          <img
            src="/Background/FrutaBack2.png"
            alt="Logo NutrIA"
            className="w-auto h-auto"
          />
        </div>
      </div>
    </>
  );
}
