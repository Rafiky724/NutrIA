import { itemSettings } from "../../../../data/itemsShop";
import { useIsMobile } from "../../../../hooks/useIsMobile";

type ItemEquipado = {
  id: string | number;
  type: string;
  imagen: string;
  equipado: boolean;
  zIndex?: number;
};

type Mascota = {
  tipo: string;
  nombre?: string;
};

type Props = {
  mascota: Mascota;
  items: ItemEquipado[];
};

export default function EquippedItems({ mascota, items }: Props) {
  const isMobile = useIsMobile();

  const folderMap: Record<string, string> = {
    gorras: "Gorras",
    gafas: "Gafas",
    accesorios: "Accesorios",
    marcos: "Marcos",
    fondos: "Fondos",
  };

  return (
    <div className="relative w-max h-max">
      {mascota.tipo && (
        <div className="flex items-center  justify-center w-xs md:w-sm h-80 md:h-50">
          <img
            className="w-[200px] md:w-2xs relative z-10"
            src={`/SVG/Pets/Shop/EditMascota/${mascota.tipo}.svg`}
            alt="Mascota"
          />
        </div>
      )}

      {items
        .filter((item) => item.equipado)
        .map((item) => {
          const mascotaConfig = itemSettings[mascota.tipo];
          if (!mascotaConfig) return null;

          const config = mascotaConfig[item.imagen.replace(".svg", "")];
          if (!config) return null;

          const current = isMobile ? config.mobile : config.desktop;

          return (
            <img
              key={item.id}
              src={`/SVG/Pets/Shop/${folderMap[item.type]}/${item.imagen}`}
              alt={item.type}
              className="absolute object-contain flex justify-center items-center rounded-4xl"
              style={{
                left: `${current.position.x}px`,
                top: `${current.position.y}px`,
                width: `${current.size.width}px`,
                height: `${current.size.height}px`,
                zIndex: item.zIndex ?? current.zIndex?.z ?? 20,
              }}
            />
          );
        })}
    </div>
  );
}
