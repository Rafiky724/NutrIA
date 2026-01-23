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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <h3 className="text-2xl ft-bold mb-4 text-brown">Agregar alimentos</h3>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Izquierda: Input */}
          <div className="flex-1 flex flex-col items-start">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Nombre del ingrediente"
              className="bg-input rounded-2xl px-3 py-2 w-full mb-2 ft-light"
            />
            <button
              type="button"
              onClick={handleAddCustom}
              className="bg-yellow text-brown ft-medium px-4 py-2 rounded-lg shadow-md mx-auto w-4xs cursor-pointer"
            >
              Agregar
            </button>
          </div>

          {/* Derecha: Lista */}
          <div className="flex-1 h-50 max-h-60 overflow-y-auto">
            {customIngredients.length === 0 ? (
              <p className="text-gray ft-light">
                No has agregado alimentos aún.
              </p>
            ) : (
              <ul className="text-left text-sm text-gray ft-light bg-input px-4 py-2 rounded-xl h-auto">
                {customIngredients.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white rounded-xl px-2 py-2 my-2"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomIngredients(
                          customIngredients.filter((_, index) => index !== i),
                        );
                      }}
                      className="text-gray font-bold mr-3 cursor-pointer"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="ft-light text-gray cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="ft-medium bg-yellow text-brown px-5 py-2 rounded-lg shadow-md cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
