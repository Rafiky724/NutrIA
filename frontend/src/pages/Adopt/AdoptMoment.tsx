import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ArrowReturn from "../../components/Decoration/ArrowReturn";

export default function AdoptMoment() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  const options = [
    {
      id: 1,
      label: "Perro",
      image: "/SVG/Pets/Adopt/perro.svg",
    },
    {
      id: 2,
      label: "Gato",
      image: "/SVG/Pets/Adopt/gato.svg",
    },
    {
      id: 3,
      label: "Nutria",
      image: "/SVG/Pets/Adopt/nutria.svg",
    },
  ];

  const handleContinue = () => {
    if (!selectedOption) {
      setToast({
        open: true,
        message: "Debes adoptar una mascota.",
        type: "error",
      });
      return;
    }
    const selectedPet = options.find((o) => o.id === selectedOption);

    navigate("/petName", {
      state: {
        tipo_mascota: selectedPet?.label.toLowerCase(),
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
        <ArrowReturn to="/weeklyMealPlan" />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-3xl max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50 flex flex-col gap-6">
          <div className="flex flex-row justify-center items-center gap-8">
            <img
              src="/SVG/Pets/Adopt/PetIcon.svg"
              alt="Adoptar"
              className="w-14 h-14 md:w-16 md:h-16"
            />

            <h2 className="text-xl md:text-2xl text-brown ft-bold mt-4">
              ¡Es momento de adoptar!
            </h2>
          </div>

          <p className="ft-light text-sm my-0 md:my-6 text-justify text-gray">
            Tu mascota te acompañará en cada paso hacia una mejor versión de ti.
            Elige la que más conecte contigo y deja que te motive todos los
            días.
          </p>

          <div className="flex justify-center items-center gap-6 sm:gap-10 md:gap-16 mt-6">
            {options.map((option) => {
              const isSelected = selectedOption === option.id;

              return (
                <label
                  key={option.id}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="adoptionType"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOption(option.id)}
                    className="hidden"
                  />

                  <img
                    src={option.image}
                    alt={option.label}
                    className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover transition 
                    ${isSelected ? "ring-0 ring-yellow scale-105" : "hover:scale-105"}`}
                  />

                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
  ${isSelected ? "br-yellow" : "border-gray-400"}`}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 bg-yellow rounded-full"></span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-60 mx-auto block bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer mt-10"
          >
            Continuar
          </button>
        </div>
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />

      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
