export default function FinalForm() {
  return (
    <>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/BoardIcon.svg"
            alt="Cantidad de comidas"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown">
          <h2>Todo listo para empezar</h2>
        </div>
      </div>

      <p className="ft-light text-gray mb-60 text-justify p-8">
        Antes de continuar, crea una cuenta. Así podremos guardar tu
        información, objetivos y progreso.
      </p>
    </>
  );
}
