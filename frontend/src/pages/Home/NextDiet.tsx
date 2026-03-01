import { useNavigate } from "react-router-dom";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function NextDiet() {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-3 md:mb-8">
            <div className="w-16 sm:w-18">
              <img
                src="/SVG/IconsGeneral/TableApple.svg"
                alt="Datos Dieta"
                className="w-full h-auto"
              />
            </div>
            <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
              <h2>Crear tu próxima dieta</h2>
            </div>
          </div>

          <div className="ft-light text-justify text-gray my-2 text-sm sm:text-base md:text-md px-2 sm:px-6 mb-4">
            Vas a crear tu nueva dieta semanal del 23 de febrero al 1 de marzo.
            Pero antes, revisa que los ingredientes de tu despensa estén
            actualizados; puedes modificarlos o cambiar entre ingredientes
            Disponibles y Despensa en configuración. Si quieres, también puedes
            continuar con tu dieta actual sin hacer cambios.
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => navigate("/homeLayout?section=1")}
              className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4 custom-bg transition hover:scale-105"
            >
              <h4 className="ft-medium text-center text-xs sm:text-md xl:text-lg">
                Editar despensa
              </h4>
            </button>

            <button
              type="button"
              onClick={() => navigate("/homeLayout?section=2")}
              className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4 custom-bg transition hover:scale-105"
            >
              <h4 className="ft-medium text-center text-xs sm:text-md xl:text-lg">
                Mantener mi dieta actual
              </h4>
            </button>

            <button
              type="button"
              onClick={() => navigate("/homeLayout?section=2")}
              className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4 custom-bg transition hover:scale-105"
            >
              <h4 className="ft-medium text-center text-xs sm:text-md xl:text-lg">
                Generar nueva dieta semanal
              </h4>
            </button>
          </div>
        </div>
      </div>

      {/* Decorations */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
