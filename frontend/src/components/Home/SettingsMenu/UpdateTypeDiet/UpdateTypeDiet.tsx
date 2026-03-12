import { Link, useNavigate } from "react-router-dom";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import { cambiarTipoDieta } from "../../../../services/planService";

export default function UpdateTypeDiet() {
  const navigate = useNavigate();

  const handleDisponible = async () => {
    try {
      await cambiarTipoDieta({ tipo_dieta: "Disponible" });
      console.log("Actualizado");
      navigate("/config");
    } catch (error: any) {
      console.error("Error al actualizar tipo de dieta:", error);
      alert(error.response?.data?.detail || "Error al cambiar tipo de dieta");
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
          <div className="px-4 sm:px-6 md:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-3 sm:space-y-0">
              <div className="w-16 sm:w-20">
                <img
                  src="/SVG/IconsGeneral/TableApple.svg"
                  alt="Datos Dieta"
                  className="w-full h-auto"
                />
              </div>
              <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
                <h2>¿Cómo quieres que construyamos tu dieta?</h2>
              </div>
            </div>

            <div className="ft-light text-justify text-gray my-6 md:my-10 text-sm sm:text-base md:text-md px-2 sm:px-6">
              Puedes elegir entre basarla en tu presupuesto o en los alimentos
              que ya tienes disponibles. Ambas opciones te permitirán filtrar
              por tus gustos y restricciones.
            </div>

            <div className="flex flex-col gap-4 mt-8 mb-8">
              <Link
                to={"/basedBudget"}
                className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4 transition hover:scale-105"
              >
                <h4 className="ft-medium text-left text-xs sm:text-lg">
                  Basada en presupuesto
                </h4>
                <p className="text-sm sm:text-base text-justify ft-light md:block hidden">
                  La dieta se ajustará a un presupuesto semanal, incluyendo los
                  alimentos que selecciones.
                </p>
              </Link>

              <button
                type="button"
                onClick={handleDisponible}
                className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4 transition hover:scale-105"
              >
                <h4 className="ft-medium text-left text-xs sm:text-lg">
                  Basada en alimentos disponibles
                </h4>
                <p className="text-sm sm:text-base text-justify ft-light md:block hidden">
                  La dieta se ajustará a lo que tengas en casa o a lo que tengas
                  fácil acceso.
                </p>
              </button>
            </div>

            <div className="flex justify-start px-2 sm:px-6">
              <ArrowReturn to="/Config" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
