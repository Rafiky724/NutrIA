import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { categoriesData } from "../../../data/menu";
import {
  getTiendaMascotas,
  getItemsCategoria,
  comprarOEquiparItem,
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

  const SKELETON_COUNT = 8;
  const skeletonGrid = Array.from({ length: SKELETON_COUNT });

  useEffect(() => {
    const fetchInicial = async () => {
      setLoading(true);
      try {
        const cacheMascotaActual = sessionStorage.getItem("mascotaActual");
        const cacheItemsMascotas = sessionStorage.getItem("items_mascotas");

        let tienda: any;

        if (cacheMascotaActual && cacheItemsMascotas) {
          setMascotaActual(JSON.parse(cacheMascotaActual));
          setItems(JSON.parse(cacheItemsMascotas));
        } else {
          tienda = await getTiendaMascotas();
          setMascotaActual(tienda.mascota_actual);
          setItems(tienda.mascotas_tienda);

          sessionStorage.setItem(
            "mascotaActual",
            JSON.stringify(tienda.mascota_actual),
          );
          sessionStorage.setItem(
            "items_mascotas",
            JSON.stringify(tienda.mascotas_tienda),
          );
        }
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
      const cacheKey = `items_${category}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        setItems(JSON.parse(cached));
      } else {
        let data: any;
        if (category === "mascotas") {
          const tienda = await getTiendaMascotas();
          setMascotaActual(tienda.mascota_actual);
          setItems(tienda.mascotas_tienda);

          sessionStorage.setItem(
            "mascotaActual",
            JSON.stringify(tienda.mascota_actual),
          );
          sessionStorage.setItem(
            "items_mascotas",
            JSON.stringify(tienda.mascotas_tienda),
          );
        } else {
          data = await getItemsCategoria(category);
          setItems(data.items);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.items));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = async (item: any) => {
    try {
      const payload: any = {
        item_id: item.id,
        categoria: activeCategory,
      };
      if (activeCategory === "mascotas" && !item.comprado) {
        const nombre = prompt("Ponle un nombre a tu mascota 🐾");
        if (!nombre) return;
        payload.nombre_mascota = nombre;
      }

      await comprarOEquiparItem(payload);

      if (activeCategory === "mascotas") {
        const tienda = await getTiendaMascotas();
        setItems(tienda.mascotas_tienda);
        setMascotaActual(tienda.mascota_actual);

        sessionStorage.setItem(
          "mascotaActual",
          JSON.stringify(tienda.mascota_actual),
        );
        sessionStorage.setItem(
          "items_mascotas",
          JSON.stringify(tienda.mascotas_tienda),
        );
      } else {
        const data = await getItemsCategoria(activeCategory);
        setItems(data.items);
        sessionStorage.setItem(
          `items_${activeCategory}`,
          JSON.stringify(data.items),
        );

        const tienda = await getTiendaMascotas();
        setMascotaActual(tienda.mascota_actual);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between xl:justify-center gap-5 xl:gap-20 px-4">
      <div className="relative bg-white rounded-b-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-100 mb-10 justify-center">
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-15 overflow-y-auto p-1 max-h-96">
          <img
            className="absolute top-0 left-0 w-80 md:w-125 xl:w-145 "
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

      <div className="flex flex-col gap-4 ml-10 md:ml-0 md:h-130 justify-around md:mt-8">
        {loading || !mascotaActual ? (
          <>
            <Skeleton height={192} width={192} />
            <Skeleton height={32} width={160} className="mt-2" />
          </>
        ) : (
          <>
            <img
              src={`/SVG/Pets/Shop/Mascotas/${mascotaActual?.tipo}.svg`}
              alt="Mascota"
              className="w-65 sm:w-72 md:w-80 lg:w-96 h-auto object-contain"
            />
            <h3 className="ft-medium text-xl md:text-2xl text-center text-white bg-brown rounded-full py-1">
              {mascotaActual?.nombre || "Mascota"}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
