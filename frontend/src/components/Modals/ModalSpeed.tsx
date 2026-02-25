import { useEffect } from "react";

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
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl ft-bold text-brown mb-6 text-center">
          Selecciona la velocidad
        </h2>

        <div className="flex flex-col gap-4 mt-4">
          {options.map((op, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onSelectSpeed(op.label);
                onClose();
              }}
              className="w-full sm:w-80 mx-auto px-4 py-2 rounded-xl custom-bg transition cursor-pointer hover:scale-105"
            >
              <h4 className="ft-medium text-left text-md sm:text-lg">
                {op.label}
              </h4>
              <p className="text-sm text-justify ft-light sm:text-base mt-1">
                {op.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
