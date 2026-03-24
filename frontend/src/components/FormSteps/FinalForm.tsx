export default function FinalForm() {
  return (
    <div className="sm:px-6 md:px-10 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
        <div className="w-12 sm:w-16">
          <img
            src="/SVG/IconsGeneral/BoardIcon.svg"
            alt="Cantidad de comidas"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg md:text-xl text-brown text-center md:text-left">
          <h2>Todo listo para empezar</h2>
        </div>
      </div>

      <p className="ft-light text-justify text-gray my-3 md:my-5 text-sm sm:text-base md:text-md px-8 sm:px-16 pt-10 pb-10">
        Antes de continuar, crea una cuenta. Así podremos guardar tu
        información, objetivos y progreso.
      </p>
    </div>
  );
}
