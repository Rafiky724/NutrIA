type ModalVelocidadProps = {
  onSelectVelocidad: (velocidad: string) => void;
  onClose: () => void;
};

export default function ModalVelocidad({
  onSelectVelocidad,
  onClose,
}: ModalVelocidadProps) {
  const opciones = [
    {
      label: "Lento",
      descripcion:
        "Cambios graduales y fáciles de mantener. Ideal para largo plazo y hábitos sostenibles",
    },
    {
      label: "Moderado",
      descripcion:
        "Un punto medio entre rapidez y sostenibilidad. Resultados visibles sin ser demasiado exigente.",
    },
    {
      label: "Rápido",
      descripcion:
        "Resultados en menos tiempo. Requiere más disciplina y ajustes estrictor.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-lg">
        <h2 className="text-xl poppins-bold text-center mb-6 font_brown">
          Selecciona la velocidad
        </h2>

        <div className="flex flex-col gap-4 mt-4">
          {opciones.map((op, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onSelectVelocidad(op.label);
                onClose();
              }}
              className={`w-60 md:w-80 xl:w-xl mx-auto py-2 rounded-xl cursor-pointer text-lg custom-bg`}
            >
              <h4 className="poppins-bold text-left px-4 text-sm md:text-lg">
                {op.label}
              </h4>

              <p className="text-sm mt-2 text-left poppins-regular px-4 pb-2 md:block hidden">
                {op.descripcion}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
