type Props = {
  onSelectSpeed: (speed: string) => void;
  onClose: () => void;
};

const options = [
  {
    label: "Lento y constante",
    description:
      "Cambios graduales y fáciles de mantener. Ideal para largo plazo y hábitos sostenibles",
  },
  {
    label: "Equilibrado (recomendado)",
    description:
      "Un punto medio entre rapidez y sostenibilidad. Resultados visibles sin ser demasiado exigente.",
  },
  {
    label: "Rápido",
    description:
      "Resultados en menos tiempo. Requiere más disciplina y ajustes estrictor.",
  },
];

export default function ModalSpeed({ onSelectSpeed, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-lg">
        <h2 className="text-2xl ft-bold text-center mb-6 text-brown">
          Selecciona la velocidad
        </h2>

        <div className="flex flex-col gap-4 mt-4 ">
          {options.map((op, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onSelectSpeed(op.label);
                onClose();
              }}
              className={`md:w-sm mx-auto px-4 py-2 rounded-xl cursor-pointer custom-bg`}
            >
              <h4 className="ft-medium text-left text-md">{op.label}</h4>

              <p className="text-sm text-justify ft-light md:block hidden">
                {op.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
