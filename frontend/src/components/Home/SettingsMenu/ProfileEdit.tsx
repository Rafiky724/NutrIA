// ProfileEdit.tsx
import { useState } from "react";

type Props = {
  onBack: () => void;
  onGoToShop?: () => void;
};

export default function ProfileEdit({ onBack, onGoToShop }: Props) {
  const [editableValues, setEditableValues] = useState({
    nombre: "Juan Pérez",
    apodo: "La Pulga",
  });

  const handleChange = (name: string, value: string) => {
    setEditableValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
      <div className="bg-white rounded-4xl shadow-lg p-6 md:p-12 xl:p-18 w-2xs md:w-4xl xl:w-7xl flex flex-col md:flex-row gap-6 overflow-y-auto h-auto justify-between ml-10 md:ml-0 ">
        <div className="md:w-xl flex flex-col justify-between">
          <button
            onClick={onBack}
            className="w-full rounded-4xl bg-gray-200 p-2 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
          >
            <img
              src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
              alt="back"
              className="w-4 h-4 rotate-180"
            />
            <h4 className="ft-medium text-xs sm:text-md">Volver</h4>
          </button>

          <div className="flex flex-col mt-4 gap-2">
            <div>
              <label className="ft-medium text-md text-brown ml-4">
                Nombre
              </label>
              <input
                type="text"
                value={editableValues.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4"
              />
            </div>

            <div>
              <label className="ft-medium text-md text-brown ml-4">Apodo</label>
              <input
                type="text"
                value={editableValues.apodo}
                onChange={(e) => handleChange("apodo", e.target.value)}
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4"
              />
            </div>

            <div>
              <label className="ft-medium text-md text-brown ml-4">
                Correo
              </label>
              <input
                type="email"
                value="juan.perez@email.com"
                disabled
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4 text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div>
              <label className="ft-medium text-md text-brown ml-4">
                Género
              </label>
              <input
                type="text"
                value="Masculino"
                disabled
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4 text-gray-400"
              />
            </div>

            <div>
              <label className="ft-medium text-md text-brown ml-4">Edad</label>
              <input
                type="text"
                value="28 años"
                disabled
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4 text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div>
              <label className="ft-medium text-md text-brown ml-4">
                Altura
              </label>
              <input
                type="text"
                value="1.75 m"
                disabled
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4 text-gray-400"
              />
            </div>

            <div>
              <label className="ft-medium text-md text-brown ml-4">Peso</label>
              <input
                type="text"
                value="72 kg"
                disabled
                className="w-full p-3 rounded-full border-none bg-input pl-4 placeholder:pl-4 text-gray-400"
              />
            </div>
          </div>

          <button className="w-full ft-medium bg-yellow text-brown p-3 rounded-full mt-4 hover:scale-105 transition cursor-pointer">
            Editar información
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 justify-between">
          <img
            src="/SVG/Pets/PetSelected.svg"
            alt="Messi"
            className="w-md h-auto rounded-2xl object-cover"
          />
          <h3 className="ft-bold text-2xl text-center text-brown">
            Lionel Messi
          </h3>

          {onGoToShop && (
            <button
              onClick={onGoToShop}
              className="bg-brown text-white px-8 py-2 rounded-full hover:scale-105 transition flex items-center gap-4 cursor-pointer ft-light"
            >
              Ir a la tienda
              <img
                src="/SVG/Pets/ShopIcon.svg"
                alt="icon"
                className="w-5 h-5"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
