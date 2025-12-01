import { useEffect, useState } from "react";
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { FormData } from "../../types";
import ModalGenero from "../UI/ModalGenero";
import ModalEdad from "../UI/ModalEdad";
import ModalPeso from "../UI/ModalPeso";
import ModalAltura from "../UI/ModalAltura";

type Step1Props = {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
};

export default function Step1({ register, setValue, getValues }: Step1Props) {
  const [showEdadModal, setShowEdadModal] = useState(false);
  const [showGeneroModal, setShowGeneroModal] = useState(false);
  const [showPesoModal, setShowPesoModal] = useState(false);
  const [showAlturaModal, setShowAlturaModal] = useState(false);

  useEffect(() => {
    register("edad", { required: "La edad es obligatoria" });
    register("genero", { required: "El género es obligatorio" });
    register("peso", { required: "El peso es obligatorio" });
    register("altura", { required: "La altura es obligatoria" });
  }, [register]);

  const campos = [
    {
      label: "Edad",
      value: getValues("edad") ? `${getValues("edad")} años` : "",
      onClick: () => setShowEdadModal(true),
    },
    {
      label: "Género",
      value: getValues("genero"),
      onClick: () => setShowGeneroModal(true),
    },
    {
      label: "Peso",
      value: getValues("peso") ? `${getValues("peso")} kg` : "",
      onClick: () => setShowPesoModal(true),
    },
    {
      label: "Altura",
      value: getValues("altura") ? `${getValues("altura")} cm` : "",
      onClick: () => setShowAlturaModal(true),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center space-x-10">
        <div className="w-30">
          <img
            src="/SVG/Datos.svg"
            alt="Datos Perfil"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-xl">
          <h2>Datos Personales</h2>
        </div>
      </div>

      <div className="poppins-medium font_brown my-10 text-left text-md">
        <p>
          Empecemos con los básico. Esto nos ayudará a calcular tus necesidades
          nutricionales.
        </p>
      </div>

      <div className="space-y-4">
        {campos.map((campo, index) => (
          <div key={index} onClick={campo.onClick} className="cursor-pointer">
            <div className="bg_inputs px-4 py-3 rounded-full flex items-center justify-between">
              <span className="font_brown poppins-bold">{campo.label}</span>
              <div className="flex items-center gap-2">
                <span className="font_brown">{campo.value}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 font_brown"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modales */}
      {showEdadModal && (
        <ModalEdad
          onSelectEdad={(edad) =>
            setValue("edad", edad, { shouldValidate: true })
          }
          onClose={() => setShowEdadModal(false)}
        />
      )}

      {showGeneroModal && (
        <ModalGenero
          onSelectGenero={(genero) =>
            setValue("genero", genero, { shouldValidate: true })
          }
          onClose={() => setShowGeneroModal(false)}
        />
      )}

      {showPesoModal && (
        <ModalPeso
          onSelectPeso={(peso) =>
            setValue("peso", peso, { shouldValidate: true })
          }
          onClose={() => setShowPesoModal(false)}
        />
      )}

      {showAlturaModal && (
        <ModalAltura
          onSelectAltura={(altura) =>
            setValue("altura", altura, { shouldValidate: true })
          }
          onClose={() => setShowAlturaModal(false)}
        />
      )}
    </>
  );
}
