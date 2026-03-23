type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRefetch: () => void;
};

export default function WarningDay({ isOpen, onClose, onRefetch }: Props) {
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
        <img
          src="SVG/Menu/Racha/WarningIcon.svg"
          alt="Advertencia"
          className="w-20 h-20 object-contain"
        />

        <h2 className="text-center text-xl ft-bold text-brown mb-6 md:mb-8">
          ¡Advertencia!
        </h2>

        <p className="text-justify text-sm text-gray ft-light md:px-10">
          Tienes comidas pendientes por verificar del día de ayer. Por favor,
          confirma que las consumiste o sube una foto para validarlas. De lo
          contrario, tu racha podría estar en riesgo
        </p>

        <button
          type="button"
          onClick={handleClick}
          className="w-3xs mx-auto bg-yellow text-brown py-2 rounded-4xl mt-10 md:mt-30 ft-medium text-xs hover:scale-105 transition cursor-pointer"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
