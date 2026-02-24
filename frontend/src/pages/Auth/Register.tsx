import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type { FormData as NutriaFormData, RegisterForm } from "../../types";
import { loginUser, registerUser } from "../../services/authService";
import { mapToRegisterRequest } from "../../utils/mappers";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterForm>({
    nombre: "",
    apodo: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nutriaRaw = localStorage.getItem("datosNutrIA");
    if (!nutriaRaw) return console.error("No existen datos en datosNutrIA");

    let nutriaForm: NutriaFormData;
    try {
      nutriaForm = JSON.parse(nutriaRaw);
    } catch {
      return console.error("datosNutrIA está corrupto");
    }

    try {
      const payload = mapToRegisterRequest(nutriaForm, formData);
      await registerUser(payload);

      const loginResponse = await loginUser({
        email: formData.correo,
        password: formData.contraseña,
      });

      localStorage.setItem("token", loginResponse.access_token);
      localStorage.setItem("nombreUsuario", formData.nombre);
      localStorage.removeItem("datosNutrIA");

      navigate("/dietCreationReady");
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center px-4 sm:px-6 md:px-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-md text-center flex flex-col gap-4 z-50"
      >
        {/* Header con icono */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
          <div className="w-16 sm:w-20 md:w-24">
            <img
              src="/SVG/IconsGeneral/DataIcon.svg"
              alt="Crear cuenta"
              className="w-full h-auto"
            />
          </div>
          <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center sm:text-left">
            <h2>Crear Cuenta</h2>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label
              htmlFor="nombre"
              className="block text-brown ft-medium text-left mb-1"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
              className="w-full px-4 py-2 rounded-3xl bg-input ft-light text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="apodo"
              className="block text-brown ft-medium text-left mb-1"
            >
              Apodo
            </label>
            <input
              id="apodo"
              name="apodo"
              type="text"
              value={formData.apodo}
              onChange={handleChange}
              placeholder="Ingresa tu apodo"
              required
              className="w-full px-4 py-2 rounded-3xl bg-input ft-light text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="correo"
              className="block text-brown ft-medium text-left mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              required
              className="w-full px-4 py-2 rounded-3xl bg-input ft-light text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="contraseña"
              className="block text-brown ft-medium text-left mb-1"
            >
              Contraseña
            </label>
            <input
              id="contraseña"
              name="contraseña"
              type="password"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
              className="w-full px-4 py-2 rounded-3xl bg-input ft-light text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Botón Crear Cuenta */}
        <button
          type="submit"
          className="w-full sm:w-64 md:w-72 mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl mt-6 cursor-pointer text-sm sm:text-base"
        >
          Crear Cuenta
        </button>
      </form>

      {/* Frutas decorativas */}
      <div className="absolute left-0 bottom-0 z-10 w-24 sm:w-48 md:w-60">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-24 sm:w-48 md:w-60">
        <FruitRight />
      </div>
    </div>
  );
}
