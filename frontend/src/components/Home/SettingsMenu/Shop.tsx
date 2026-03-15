import { useState } from "react";
import { shopItemsData, categoriesData } from "../../../data/menu";

type ShopItem = {
  name: string;
  icon: string;
  category: string;
  price: number;
  available: boolean;
};

type Category = {
  name: string;
  icon: string;
  type: string;
};

type Props = {
  shopItems?: ShopItem[];
  categories?: Category[];
  backgroundImg?: string;
  onBack?: () => void;
};

export default function Shop({
  shopItems = shopItemsData,
  categories = categoriesData,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.type ?? "mascotas",
  );

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredItems = shopItems.filter(
    (item) => item.category === activeCategory,
  );

  return (
    <div className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-between xl:justify-center gap-5 xl:gap-20 px-4">
      <div className="relative bg-white rounded-b-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-100 mb-10 justify-center">
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-15 overflow-y-auto p-1 max-h-96">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => setSelectedItem(item.name)}
            >
              <div
                className={`flex bg-input rounded-xl p-2 justify-center items-center
        ${selectedItem === item.name ? "border-4 br-yellow" : "border-4 br-input"}`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-18 h-18 object-contain"
                />
              </div>

              <div className="flex items-center gap-1 mt-1">
                {item.available ? (
                  <img
                    src="/SVG/Pets/Shop/CompradoIcon.svg"
                    alt="Disponible"
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                ) : (
                  <>
                    <img
                      src="/SVG/IconsGeneral/GemsIcon.svg"
                      alt="Gems"
                      className="w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-md font-bold text-brown">
                      {item.price}
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
              onClick={() => setActiveCategory(cat.type)}
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

      <img
        className="absolute top-82 left-13 w-80 md:w-125 md:top-13 md:-left-1 xl:w-145 xl:left-65"
        src="/SVG/Pets/Shop/Roof.svg"
        alt="Techo"
      />

      <div className="flex flex-col gap-4 ml-10 md:ml-0 md:h-130 justify-around md:mt-8">
        <img
          src="/SVG/Pets/PetSelected.svg"
          alt="Mascota"
          className="w-65 sm:w-72 md:w-80 lg:w-96 h-auto object-contain"
        />
        <h3 className="ft-medium text-xl md:text-2xl text-center text-white bg-brown rounded-full py-1">
          Lionel Messi
        </h3>
      </div>
    </div>
  );
}
