import { useState } from "react";
import {
  verificarIngredienteUsuario,
  type VerificarIngredienteRequest,
} from "../../services/despensaService";
import Toast from "../Toast/Toast";

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

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleAddCustom = async () => {
    const trimmed = newIngredient.trim();
    if (!trimmed) return;

    try {
      const payload: VerificarIngredienteRequest = { ingrediente: trimmed };
      const response = await verificarIngredienteUsuario(payload);

      if (!response.esIngrediente) {
        showToast("Este no es un ingrediente válido.");
        return;
      }

      if (!customIngredients.includes(trimmed)) {
        setCustomIngredients([...customIngredients, trimmed]);
      }

      setNewIngredient("");
    } catch (err) {
      console.error(err);
      console.log("Error al verificar el ingrediente.");
    }
  };

  const handleAccept = () => {
    onAccept(customIngredients);
    setCustomIngredients([]);
    setNewIngredient("");
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl p-8 md:p-10 w-full max-w-2xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="ft-bold text-xl md:text-2xl text-brown text-center mb-10">
          Agregar alimentos
        </h3>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
          <div className="flex-1 flex flex-col items-center">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Nombre del ingrediente"
              className="bg-input rounded-4xl px-4 py-3 w-full mb-4 ft-light text-sm sm:text-base"
            />

            <button
              type="button"
              onClick={handleAddCustom}
              className="bg-green text-white ft-medium px-10 py-2 rounded-4xl shadow-md cursor-pointer text-sm sm:text-base hover:scale-105 transition"
            >
              Agregar
            </button>
          </div>

          <div className="flex-1 h-56 max-h-56 overflow-y-auto w-full bg-input px-4 py-4 rounded-4xl">
            {customIngredients.length === 0 ? (
              <p className="text-gray ft-light text-center">
                No has agregado alimentos aún.
              </p>
            ) : (
              <ul className="text-left text-sm sm:text-base text-gray ft-light">
                {customIngredients.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white rounded-xl px-3 py-2 my-2 shadow-sm"
                  >
                    <span>{item}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setCustomIngredients(
                          customIngredients.filter((_, index) => index !== i),
                        )
                      }
                      className="text-gray font-bold cursor-pointer px-2 hover:scale-105 transition"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleAccept}
            className="ft-medium bg-yellow text-brown w-48 py-3 rounded-4xl shadow-md cursor-pointer hover:scale-105 transition"
          >
            Aceptar
          </button>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        type="error"
      ></Toast>
    </div>
  );
}
