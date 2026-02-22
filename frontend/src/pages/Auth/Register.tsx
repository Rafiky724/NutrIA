import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type { FormData as NutriaFormData, RegisterForm } from "../../types";
import { loginUser, registerUser } from "../../services/authService";
import { mapToRegisterRequest } from "../../utils/mappers";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
// import ArrowReturn from "../../components/Decoration/ArrowReturn";

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

    // Obtener datos nutricionales
    const nutriaRaw = localStorage.getItem("datosNutrIA");
    if (!nutriaRaw) {
      console.error("No existen datos en datosNutrIA");
      return;
    }

    let nutriaForm: NutriaFormData;
    try {
      nutriaForm = JSON.parse(nutriaRaw);
    } catch {
      console.error("datosNutrIA está corrupto");
      return;
    }

    try {
      // Mapear al formato del backend
      const payload = mapToRegisterRequest(nutriaForm, formData);

      // Llamar al backend
      await registerUser(payload);

      // Loguear al usuario automáticamente
      const loginResponse = await loginUser({
        email: formData.correo,
        password: formData.contraseña,
      });

      localStorage.setItem("token", loginResponse.access_token);
      localStorage.setItem("nombreUsuario", formData.nombre);

      // Limpieza
      localStorage.removeItem("datosNutrIA");

      // Navegar
      navigate("/dietCreationReady");
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-2xl bg-white p-8 rounded-3xl shadow-md text-center flex flex-col gap-4"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-20">
            <img
              src="/SVG/IconsGeneral/DataIcon.svg"
              alt="Crear cuenta"
              className="w-auto h-auto"
            />
          </div>
          <div className="ft-bold text-2xl text-brown">
            <h2>Crear Cuenta</h2>
          </div>
        </div>

        <div className="w-xs mx-auto space-y-2">
          <label
            htmlFor="nombre"
            className="block text-gray-700 ft-medium text-left ml-2 text-brown"
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
            className="w-full px-4 py-2 rounded-3xl bg-input ft-light"
          />

          {/* Apodo */}
          <label
            htmlFor="apodo"
            className="block text-gray-700 ft-medium text-left ml-2 text-brown"
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
            className="w-full px-4 py-2 rounded-3xl bg-input ft-light"
          />

          {/* Correo */}
          <label
            htmlFor="correo"
            className="block text-gray-700 ft-medium text-left ml-2 text-brown"
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
            className="w-full px-4 py-2 rounded-3xl bg-input ft-light"
          />

          {/* Contraseña */}
          <label
            htmlFor="password"
            className="block text-gray-700 ft-medium text-left ml-2 text-brown"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            required
            className="w-full px-4 py-2 rounded-3xl bg-input ft-light"
          />
        </div>
        <button
          type="submit"
          className="w-xs mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl mt-4 cursor-pointer"
        >
          Crear Cuenta
        </button>
      </form>

      {/* <ArrowReturn /> */}

      <div className="absolute left-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitRight />
      </div>
    </div>
  );
}
