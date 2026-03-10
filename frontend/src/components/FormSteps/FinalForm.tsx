export default function FinalForm() {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Header con icono */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
        <div className="w-12 sm:w-14 md:w-16">
          <img
            src="/SVG/IconsGeneral/BoardIcon.svg"
            alt="Cantidad de comidas"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>Todo listo para empezar</h2>
        </div>
      </div>

      {/* Texto descriptivo */}
      <p className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
        Antes de continuar, crea una cuenta. Así podremos guardar tu
        información, objetivos y progreso.
      </p>
    </div>
  );
}
