import { useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  onAccept: (ingredients: string[]) => void;
};

export default function CustomIngredientModal({
  show,
  onClose,
  onAccept,
}: Props) {
  const [newIngredient, setNewIngredient] = useState("");
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);

  const handleAddCustom = () => {
    const trimmed = newIngredient.trim();
    if (trimmed && !customIngredients.includes(trimmed)) {
      setCustomIngredients([...customIngredients, trimmed]);
      setNewIngredient("");
    }
  };

  const handleAccept = () => {
    onAccept(customIngredients);
    setCustomIngredients([]);
    setNewIngredient("");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <h3 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left mb-4">
          Agregar alimentos
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Izquierda: Input */}
          <div className="flex-1 flex flex-col items-center sm:items-start">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Nombre del ingrediente"
              className="bg-input rounded-2xl px-3 py-2 w-full mb-2 ft-light text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={handleAddCustom}
              className="bg-yellow text-brown ft-medium px-4 py-2 rounded-lg shadow-md w-full sm:w-auto cursor-pointer text-sm sm:text-base"
            >
              Agregar
            </button>
          </div>

          {/* Derecha: Lista */}
          <div className="flex-1 max-h-40 overflow-y-auto w-full sm:w-auto">
            {customIngredients.length === 0 ? (
              <p className="text-gray ft-light text-center sm:text-left">
                No has agregado alimentos aún.
              </p>
            ) : (
              <ul className="text-left text-sm sm:text-base text-gray ft-light bg-input px-2 sm:px-4 py-2 rounded-xl">
                {customIngredients.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white rounded-xl px-2 py-2 my-2 shadow-sm"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCustomIngredients(
                          customIngredients.filter((_, index) => index !== i),
                        )
                      }
                      className="text-gray font-bold cursor-pointer px-2"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer botones */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
          <button
            type="button"
            onClick={onClose}
            className="ft-light text-gray cursor-pointer px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="ft-medium bg-yellow text-brown px-4 py-2 rounded-lg shadow-md w-full sm:w-auto cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
