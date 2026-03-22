type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: "retry" | "absent") => void;
};

export default function NotCompletedMeal({ isOpen, onClose, onAction }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 pb-20 px-20 flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg ft-bold text-brown">
          Selecciona una opción
        </h2>
        <p className="text-justify text-sm text-gray-700 w-md ft-light">
          No pasa nada si hoy no pudiste completar tu comida. Crear nuevos
          hábitos toma tiempo. Si quieres, puedes recuperar tu racha usando
          gemas. Lo importante es no rendirse y seguir intentandolo.
        </p>

        <div className="flex flex-col gap-4 w-xs mx-auto">
          <button
            className="bg-yellow text-brown ft-medium py-3 px-4 rounded-xl hover:scale-105 transition text-xs text-left cursor-pointer"
            onClick={() => onAction("retry")}
          >
            <p className="ft-bold mb-2">No pude completarla</p>
            <p className="text-xs ft-medium text-gray">
              Tu racha puede verse afectada.
            </p>
          </button>
          <button
            className="bg-yellow text-brown ft-medium py-3 px-4 rounded-xl hover:scale-105 transition text-xs text-left cursor-pointer"
            onClick={() => onAction("absent")}
          >
            <p className="ft-bold mb-2">Comi otra cosa</p>
            <p className="text-gray text-xs ft-medium">
              Cuéntanos qué consumiste.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
