import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  title?: string;
  description?: string;
};

export default function AbsentMeal({
  isOpen,
  onClose,
  onSubmit,
  title = "Cuéntanos qué comiste",
  description = "Con la información que nos proporciones, haremos una estimación aproximada de los macronutrientes consumidos. Sé lo más preciso posible para obtener mejores resultados.",
}: Props) {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl p-8 flex flex-col gap-6 w-xs md:w-2xl md:h-120"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-2xl ft-bold text-brown">{title}</h2>

        <textarea
          className="w-full md:w-xl h-70 md:h-100 p-6 border-none rounded-4xl resize-none text-sm bg-input mx-auto placeholder:p-.5 placeholder:text-justify"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={description}
        />

        <button
          className="w-3xs md:w-xs mx-auto bg-yellow text-brown ft-medium py-2 px-4 rounded-4xl hover:scale-105 transition cursor-pointer"
          onClick={handleSubmit}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
