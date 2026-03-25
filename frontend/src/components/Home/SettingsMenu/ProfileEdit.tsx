import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  getUserPerfil,
  updateUserPerfil,
  type PerfilUsuarioResponse,
} from "../../../services/userService";

type Props = {
  onBack: () => void;
  onGoToShop?: () => void;
};

export default function ProfileEdit({ onBack, onGoToShop }: Props) {
  const [perfil, setPerfil] = useState<PerfilUsuarioResponse | null>(null);
  const [editableValues, setEditableValues] = useState({
    nombre: "",
    apodo: "",
    altura: "",
    nombre_mascota: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getUserPerfil();
        setPerfil(data);
        setEditableValues({
          nombre: data.nombre,
          apodo: data.apodo,
          altura: data.altura,
          nombre_mascota: data.mascota?.nombre || "",
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchPerfil();
  }, []);

  const handleChange = (name: string, value: string) => {
    setEditableValues((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const payload: any = {};
    if (editableValues.nombre !== perfil?.nombre)
      payload.nombre_usuario = editableValues.nombre;
    if (editableValues.apodo !== perfil?.apodo)
      payload.apodo_usuario = editableValues.apodo;
    if (editableValues.altura !== perfil?.altura)
      payload.altura_usuario = parseInt(editableValues.altura);
    if (editableValues.nombre_mascota !== perfil?.mascota?.nombre)
      payload.nombre_mascota = editableValues.nombre_mascota;
    return payload;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = buildPayload();
      if (Object.keys(payload).length === 0) return;
      const updated = await updateUserPerfil(payload);
      setPerfil(updated);
      setEditableValues({
        nombre: updated.nombre,
        apodo: updated.apodo,
        altura: updated.altura,
        nombre_mascota: updated.mascota?.nombre || "",
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
      <div className="bg-white rounded-4xl shadow-lg p-6 md:p-8 xl:p-10 w-2xs md:w-xl xl:w-4xl h-[580px] flex flex-col md:flex-row gap-6 overflow-y-auto justify-between ml-10 md:ml-0 ">
        {perfil === null ? (
          <div className="w-full flex flex-col md:flex-row gap-6">
            <div className="md:w-xl flex flex-col gap-4 w-full">
              <Skeleton height={40} className="mb-4" />
              <Skeleton height={48} className="mb-2" />
              <Skeleton height={48} className="mb-2" />
              <Skeleton height={48} className="mb-2" />
              <div className="flex gap-2">
                <Skeleton height={48} className="w-full" />
                <Skeleton height={48} className="w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton height={48} className="w-full" />
                <Skeleton height={48} className="w-full" />
              </div>
              <Skeleton height={48} className="mt-4 w-full" />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <Skeleton height={256} width={256} className="rounded-2xl" />
              <Skeleton height={32} width={160} />
              <Skeleton height={40} width={160} />
            </div>
          </div>
        ) : (
          <>
            {/* LEFT */}
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
                    className="w-full p-3 rounded-full bg-input pl-4"
                  />
                </div>

                <div>
                  <label className="ft-medium text-md text-brown ml-4">
                    Apodo
                  </label>
                  <input
                    type="text"
                    value={editableValues.apodo}
                    onChange={(e) => handleChange("apodo", e.target.value)}
                    className="w-full p-3 rounded-full bg-input pl-4"
                  />
                </div>

                <div>
                  <label className="ft-medium text-md text-brown ml-4">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={perfil?.correo || ""}
                    disabled
                    className="w-full p-3 rounded-full bg-input pl-4 text-gray-400"
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
                    value={perfil?.genero || ""}
                    disabled
                    className="w-full p-3 rounded-full bg-input pl-4 text-gray-400"
                  />
                </div>

                <div>
                  <label className="ft-medium text-md text-brown ml-4">
                    Edad
                  </label>
                  <input
                    type="text"
                    value={perfil?.edad || ""}
                    disabled
                    className="w-full p-3 rounded-full bg-input pl-4 text-gray-400"
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
                    value={editableValues.altura}
                    onChange={(e) => handleChange("altura", e.target.value)}
                    className="w-full p-3 rounded-full bg-input pl-4"
                  />
                </div>

                <div>
                  <label className="ft-medium text-md text-brown ml-4">
                    Peso
                  </label>
                  <input
                    type="text"
                    value={perfil?.peso || ""}
                    disabled
                    className="w-full p-3 rounded-full bg-input pl-4 text-gray-400 cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full ft-medium bg-yellow text-brown p-3 rounded-full mt-4 hover:scale-105 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Guardando..." : "Editar información"}
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center gap-4 justify-between">
              <img
                src={`/SVG/Pets/Shop/Mascotas/${perfil?.mascota?.tipo}.svg`}
                alt={`${perfil?.mascota?.tipo}`}
                className="w-100 h-100 rounded-2xl object-cover"
              />

              <input
                type="text"
                value={editableValues.nombre_mascota}
                onChange={(e) => handleChange("nombre_mascota", e.target.value)}
                className="w-full text-center ft-bold text-2xl text-brown bg-transparent border-b-2 border-brown outline-none"
              />

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
          </>
        )}
      </div>
    </div>
  );
}
