type shopItems = {
  name: string;
  icon: string;
};

type categories = {
  name: string;
  icon: string;
};

type Props = {
  shopItems: shopItems[];
  categories: categories[];
  backgroundImg: string;
  onBack: () => void;
};

export default function Shop({
  shopItems,
  categories,
  backgroundImg,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="w-full rounded-2xl bg-gray-200 p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
      >
        <img
          src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
          alt="back"
          className="w-4 h-4 rotate-180"
        />
        <h4 className="ft-light text-xs sm:text-md xl:text-lg">Volver</h4>
      </button>

      <img src={backgroundImg} alt="cloth" className="w-60 mb-[-15px]" />

      <div className="bg-white w-64 h-64 rounded-3xl shadow-lg p-4 grid grid-cols-3 gap-3">
        {shopItems.map((item, index) => (
          <div
            key={index}
            className="bg-input rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition"
          >
            <img src={item.icon} alt={item.name} className="w-8 h-8" />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:scale-110 transition"
          >
            <img src={cat.icon} alt={cat.name} className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
