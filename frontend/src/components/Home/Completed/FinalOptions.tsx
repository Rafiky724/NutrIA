type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
};

export default function FinalOptions({
  isOpen,
  onClose,
  onSelectOption,
}: Props) {
  if (!isOpen) return null;

  const options = [
    { label: "Ir a tu plan semanal", value: "go_plan" },
    { label: "La actualizaré después", value: "update_plan" },
    { label: "Cambiar día para actualizar dieta", value: "change_day" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5 md:p-0"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl p-8 pb-10 md:pb-20 flex flex-col gap-6 md:w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg ft-bold text-brown">
          Selecciona una opción
        </h2>

        <p className="text-justify text-xs text-gray ft-medium md:px-10">
          Hoy es el día de actualizar tu dieta semanal. Dirígete a tu plan
          semanal para hacer los cambios y asegúrate de que tu despensa esté
          actualizada con los ingredientes que quieres incluir en la nueva
          dieta.
        </p>

        <div className="w-3xs md:w-sm mx-auto flex flex-col gap-3 mt-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              className="bg-yellow text-brown py-3 px-4 rounded-2xl text-left ft-medium text-xs hover:scale-105 transition cursor-pointer"
              onClick={() => {
                onSelectOption(opt.value);
                onClose();
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
