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
import { useProgress } from "../../../Context/ProgressContext";
import EquippedItems from "./EquippedItem/EquippedItems";

type Category = {
  name: string;
  icon: string;
  type: string;
};

type Props = {
  categories?: Category[];
};

export default function Shop({ categories = categoriesData }: Props) {
  const { refreshProgress } = useProgress();

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

  // Modal nombre mascota
  const [showNombreModal, setShowNombreModal] = useState(false);
  const [nuevoItem, setNuevoItem] = useState<any>(null);
  const [nombreMascota, setNombreMascota] = useState("");

  const SKELETON_COUNT = 10;
  const skeletonGrid = Array.from({ length: SKELETON_COUNT });

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

        if (mascotaActual) {
          setItems(mapEquipados(data.items, mascotaActual, category));
        } else {
          setItems(data.items);
        }
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

      if (!item.comprado || activeCategory === "fondos") {
        refreshProgress();
      }

      if (activeCategory === "mascotas") {
        const tienda = await getTiendaMascotas();
        setItems(tienda.mascotas_tienda);
        setMascotaActual(tienda.mascota_actual);
        refreshProgress();
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

      refreshProgress();

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

      return {
        ...item,
        equipado,
        type: categoria,
      };
    });
  };

  const getEquippedItemsFromMascota = (mascota: any) => {
    if (!mascota) return [];

    const equipped: any[] = [];

    if (mascota.gorra_puesto) {
      equipped.push({
        id: `gorra-${mascota.gorra_puesto}`,
        imagen: `${mascota.gorra_puesto}.svg`,
        type: "gorras",
        equipado: true,
      });
    }

    if (mascota.gafa_puesto) {
      equipped.push({
        id: `gafa-${mascota.gafa_puesto}`,
        imagen: `${mascota.gafa_puesto}.svg`,
        type: "gafas",
        equipado: true,
      });
    }

    if (mascota.accesorio_puesto) {
      equipped.push({
        id: `accesorio-${mascota.accesorio_puesto}`,
        imagen: `${mascota.accesorio_puesto}.svg`,
        type: "accesorios",
        equipado: true,
      });
    }

    if (mascota.marco_puesto) {
      equipped.push({
        id: `marco-${mascota.marco_puesto}`,
        imagen: `${mascota.marco_puesto}.svg`,
        type: "marcos",
        equipado: true,
      });
    }

    if (mascota.fondo_puesto) {
      equipped.push({
        id: `fondo-${mascota.fondo_puesto}`,
        imagen: `${mascota.fondo_puesto}.svg`,
        type: "fondos",
        equipado: true,
      });
    }

    return equipped;
  };

  const equippedItems = getEquippedItemsFromMascota(mascotaActual);

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between xl:justify-center gap-5 xl:gap-20 px-0 md:px-4">
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
                    {item.equipado ? null : item.comprado ? null : (
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

      <div className="flex flex-col items-center justify-center">
        <div className="relative flex flex-col ml-10 md:ml-0 md:h-100 justify-center md:mt-20 items-center">
          {!mascotaActual ? (
            <>
              <Skeleton height={192} width={192} />
              <Skeleton height={192} width={160} className="mt-2" />
            </>
          ) : (
            <>
              <EquippedItems mascota={mascotaActual} items={equippedItems} />
            </>
          )}
        </div>
        <div className="ml-10 md:ml-0 z-50">
          <h3 className="ft-medium text-xl md:text-2xl text-center text-white bg-brown rounded-full px-20">
            {mascotaActual?.nombre || "Mascota"}
          </h3>
        </div>
      </div>

      {showNombreModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div
            className="flex flex-col justify-center w-md bg-white rounded-4xl p-8 md:p-10 max-w-2xl shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="ft-bold text-xl md:text-2xl text-brown text-center mb-10">
              ¡Ponle un nombre a tu mascota!
            </h2>

            <input
              type="text"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              placeholder="Nombre de la mascota"
              className="bg-input p-4 rounded-4xl text-center w-2xs text-md mx-auto"
            />

            <div className="flex justify-between w-full mt-6 md:mt-8">
              <button
                onClick={confirmarNombreMascota}
                className="bg-yellow text-white ft-medium px-10 py-2 rounded-4xl shadow-md cursor-pointer text-sm sm:text-base hover:scale-105 transition mx-auto"
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
