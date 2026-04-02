import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { categoriesData } from "../../../data/menu";
import {
  getTiendaMascotas,
  getItemsCategoria,
  comprarOEquiparItem,
  type ComprarMascotaRequest,
} from "../../../services/mascotaService";

type Category = {
  name: string;
  icon: string;
  type: string;
};

type Props = {
  categories?: Category[];
};

export default function Shop({ categories = categoriesData }: Props) {
  const folderMap: Record<string, string> = {
    mascotas: "Mascotas",
    gafas: "Gafas",
    gorras: "Gorras",
    fondos: "Fondos",
    marcos: "Marcos",
    accesorios: "Accesorios",
  };

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.type ?? "mascotas",
  );
  const [items, setItems] = useState<any[] | null>(null);
  const [mascotaActual, setMascotaActual] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para modal de nombre
  const [showNombreModal, setShowNombreModal] = useState(false);
  const [nuevoItem, setNuevoItem] = useState<any>(null);
  const [nombreMascota, setNombreMascota] = useState("");

  const SKELETON_COUNT = 8;
  const skeletonGrid = Array.from({ length: SKELETON_COUNT });

  useEffect(() => {
    if (mascotaActual) {
      console.log("Mascota actual:", mascotaActual);
    }
  }, [mascotaActual]);

  useEffect(() => {
    const fetchInicial = async () => {
      setLoading(true);
      try {
        const tienda = await getTiendaMascotas();
        setMascotaActual(tienda.mascota_actual);
        setItems(tienda.mascotas_tienda);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInicial();
  }, []);

  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
    setItems(null);
    setLoading(true);

    try {
      if (category === "mascotas") {
        const tienda = await getTiendaMascotas();
        setMascotaActual(tienda.mascota_actual);
        setItems(tienda.mascotas_tienda);
      } else {
        const data = await getItemsCategoria(category);
        setItems(mapEquipados(data.items, mascotaActual, category));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = async (item: any) => {
    if (activeCategory === "mascotas" && !item.comprado) {
      setNuevoItem(item);
      setShowNombreModal(true);
      return;
    }

    try {
      const payload: any = {
        item_id: item.id,
        categoria: activeCategory,
      };

      await comprarOEquiparItem(payload);

      if (activeCategory === "mascotas") {
        const tienda = await getTiendaMascotas();
        setItems(tienda.mascotas_tienda);
        setMascotaActual(tienda.mascota_actual);
        return;
      }

      const newMascota = {
        ...mascotaActual,
        [`${activeCategory.slice(0, -1)}_puesto`]:
          mascotaActual?.[`${activeCategory.slice(0, -1)}_puesto`] ===
          item.imagen.replace(".svg", "")
            ? null
            : item.imagen.replace(".svg", ""),
      };

      setMascotaActual(newMascota);

      const data = await getItemsCategoria(activeCategory);
      setItems(mapEquipados(data.items, newMascota, activeCategory));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmarNombreMascota = async () => {
    if (!nombreMascota.trim() || !nuevoItem) return;

    try {
      const payload: ComprarMascotaRequest = {
        item_id: nuevoItem.id,
        categoria: activeCategory,
        nombre_mascota: nombreMascota.trim(),
      };

      await comprarOEquiparItem(payload);

      const tienda = await getTiendaMascotas();
      setItems(tienda.mascotas_tienda);
      setMascotaActual(tienda.mascota_actual);

      setShowNombreModal(false);
      setNombreMascota("");
      setNuevoItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  const mapEquipados = (items: any[], mascota: any, categoria: string) => {
    return items.map((item) => {
      let equipado = false;

      if (categoria === "gorras")
        equipado = mascota?.gorra_puesto === item.imagen.replace(".svg", "");
      if (categoria === "gafas")
        equipado = mascota?.gafa_puesto === item.imagen.replace(".svg", "");
      if (categoria === "accesorios")
        equipado =
          mascota?.accesorio_puesto === item.imagen.replace(".svg", "");
      if (categoria === "marcos")
        equipado = mascota?.marco_puesto === item.imagen.replace(".svg", "");
      if (categoria === "fondos")
        equipado = mascota?.fondo_puesto === item.imagen.replace(".svg", "");

      return { ...item, equipado };
    });
  };

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between xl:justify-center gap-5 xl:gap-20 px-4">
      <div className="relative bg-white rounded-b-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-100 mb-10 justify-center">
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-15 overflow-y-auto p-1 max-h-96">
          <img
            className="absolute top-0 left-0 w-80 md:w-125 xl:w-145"
            src="/SVG/Pets/Shop/Roof.svg"
            alt="Techo"
          />

          {loading || !items
            ? skeletonGrid.map((_, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <Skeleton height={72} width={72} className="rounded-xl" />
                  <Skeleton height={16} width={40} className="mt-1" />
                </div>
              ))
            : items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div
                    className={`flex bg-input rounded-xl p-2 justify-center items-center
                      ${item.equipado ? "border-4 br-yellow" : "border-4 br-input"}`}
                  >
                    <img
                      src={`/SVG/Pets/Shop/${folderMap[activeCategory]}/${item.imagen}`}
                      alt={item.id}
                      className="w-18 h-18 object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {item.equipado ? (
                      <span className="text-xs text-green-500 font-bold"></span>
                    ) : item.comprado ? (
                      <span className="text-xs text-yellow-500 font-bold"></span>
                    ) : (
                      <>
                        <img
                          src="/SVG/IconsGeneral/GemsIcon.svg"
                          alt="Gems"
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <span className="text-md font-bold text-brown">
                          {item.precio_gemas}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
        </div>

        <div className="absolute flex justify-center gap-2 z-50 -bottom-10 md:-bottom-14 xl:gap-5.5">
          {categories.map((cat) => (
            <button
              key={cat.type}
              onClick={() => handleCategoryChange(cat.type)}
              className={`rounded-b-4xl w-8 h-10 md:w-14 md:h-14 shadow-md flex items-center justify-center transition hover:scale-110 cursor-pointer
                ${activeCategory === cat.type ? "bg-yellow" : "bg-white"}`}
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="w-5 h-5 md:w-7 md:h-7"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col ml-10 md:ml-0 md:h-130 justify-around md:mt-8 items-center">
        {!mascotaActual ? (
          <>
            <Skeleton height={192} width={192} />
            <Skeleton height={32} width={160} className="mt-2" />
          </>
        ) : (
          <>
            {mascotaActual?.tipo && (
              <img
                src={`/SVG/Pets/Shop/EditMascota/${mascotaActual?.tipo}.svg`}
                alt="Mascota"
                className="w-65 sm:w-72 md:w-80 lg:w-96 h-auto object-contain z-50"
              />
            )}
            <h3 className="ft-medium text-xl md:text-2xl text-center text-white bg-brown rounded-full px-20">
              {mascotaActual?.nombre || "Mascota"}
            </h3>

            {mascotaActual?.gorra_puesto && (
              <img
                src={`/SVG/Pets/Shop/Gorras/${mascotaActual.gorra_puesto}.svg`}
                className="absolute w-30 md:w-45 h-auto object-contain -top-10 z-50"
                alt="Gorra"
              />
            )}
            {mascotaActual?.gafa_puesto && (
              <img
                src={`/SVG/Pets/Shop/Gafas/${mascotaActual.gafa_puesto}.svg`}
                className="absolute w-65 sm:w-72 md:w-80 lg:w-96 h-auto object-contain"
                alt="Gafas"
              />
            )}
            {mascotaActual?.accesorio_puesto && (
              <img
                src={`/SVG/Pets/Shop/Accesorios/${mascotaActual.accesorio_puesto}.svg`}
                className="absolute w-65 sm:w-72 md:w-80 lg:w-96 h-auto object-contain"
                alt="Accesorio"
              />
            )}
            {mascotaActual?.marco_puesto && (
              <img
                src={`/SVG/Pets/Shop/Marcos/${mascotaActual.marco_puesto}.svg`}
                className="absolute w-65 sm:w-72 md:w-80 lg:w-96 h-auto object-contain top-0"
                alt="Marco"
              />
            )}
            {mascotaActual?.fondo_puesto && (
              <img
                src={`/SVG/Pets/Shop/Fondos/${mascotaActual.fondo_puesto}.svg`}
                className="absolute w-65 md:w-120 h-auto object-contain top-0 rounded-4xl"
                alt="Fondo"
              />
            )}
          </>
        )}
      </div>

      {/* MODAL DE NOMBRE DE MASCOTA */}
      {showNombreModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5"
          onClick={() => setShowNombreModal(false)}
        >
          <div
            className="bg-white rounded-4xl p-10 flex flex-col gap-6 md:gap-8 w-full md:w-2xl max-h-[600px] overflow-y-auto items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-lg ft-bold text-brown md:mb-10">
              ¡Ponle un nombre a tu mascota!
            </h2>

            <input
              type="text"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              placeholder="Nombre de la mascota"
              className="border p-4 rounded-4xl text-center w-full text-md"
            />

            <div className="flex justify-between w-full mt-6 md:mt-8">
              <button
                onClick={() => setShowNombreModal(false)}
                className="px-6 py-3 rounded-4xl bg-gray-300 hover:bg-gray-400 text-md transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarNombreMascota}
                className="px-6 py-3 rounded-4xl bg-yellow-400 hover:bg-yellow-500 text-white text-md transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
