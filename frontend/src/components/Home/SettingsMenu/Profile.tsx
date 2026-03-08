import type { Dispatch, SetStateAction } from "react";

type FieldType = "text" | "email" | "number" | "select";

type EditField = {
  type: FieldType;
  placeholder: string;
  options?: { label: string; value: string }[];
};

type MenuOption = {
  label: string;
  onClick: () => void;
};

type Props = {
  profileView: "menu" | "edit";
  setProfileView: Dispatch<SetStateAction<"menu" | "edit">>;
  onBack: () => void;
  menuOptions: MenuOption[];
  editFields: EditField[];
};

export default function Profile({
  profileView,
  setProfileView,
  onBack,
  menuOptions,
  editFields,
}: Props) {
  return (
    <>
      {profileView === "menu" && (
        <>
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

          {menuOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full rounded-2xl bg-input p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
            >
              <h4 className="ft-light text-xs sm:text-md xl:text-lg">
                {option.label}
              </h4>
              <img
                src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
                alt="arrow"
                className="w-4 h-4"
              />
            </button>
          ))}
        </>
      )}

      {profileView === "edit" && (
        <div className="flex flex-col w-full md:w-full items-center">
          <div className="bg-white w-full rounded-3xl shadow-lg p-8 flex flex-col gap-6">
            <button
              onClick={() => setProfileView("menu")}
              className="w-full rounded-2xl bg-gray-200 p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
            >
              <img
                src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
                alt="back"
                className="w-4 h-4 rotate-180"
              />
              <h4 className="ft-light text-xs sm:text-md xl:text-lg">Volver</h4>
            </button>

            <div className="flex flex-col gap-4 mt-4">
              {editFields.map((field, index) => {
                if (field.type === "select") {
                  return (
                    <select
                      key={index}
                      className="w-full p-3 rounded-xl border border-gray-300"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((opt, i) => (
                        <option key={i} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input
                    key={index}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full p-3 rounded-xl border border-gray-300"
                  />
                );
              })}
            </div>

            <button className="w-full bg-brown text-white p-3 rounded-xl mt-4 hover:scale-105 transition">
              Editar información
            </button>
          </div>
        </div>
      )}
    </>
  );
}
