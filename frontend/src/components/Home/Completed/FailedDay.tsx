type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRefetch: () => void;
};

export default function FailedDay({ isOpen, onClose, onRefetch }: Props) {
  if (!isOpen) return null;

  const handleClick = async () => {
    try {
      console.log("advertencia tienes comidas pendientes");
      onRefetch();
      onClose();
    } catch (err) {
      console.error("Error ejecutando la acción de racha:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl p-10 flex flex-col w-full md:w-2xl max-h-150 overflow-y-auto items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="w-3xs text-center text-xl ft-bold text-brown mb-6 md:mb-8">
          Lo sentimos. Has perdido tu racha.
        </h2>

        <img
          src="SVG/IconsGeneral/FireStreak.svg"
          alt="Advertencia"
          className="w-35 h-35 object-contain"
        />

        <button
          type="button"
          onClick={handleClick}
          className="w-3xs mx-auto bg-yellow text-brown py-2 rounded-4xl mt-10 md:mt-20 ft-medium text-xs hover:scale-105 transition cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
