import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apodo: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puedes guardar los datos en localStorage o enviarlos a tu backend
    console.log("Datos de registro:", formData);

    // Redirigir al Home después de registrar
    navigate("/PlanDiario");
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-xs md:w-sm lg:w-2xl 2xl:w-4xl bg_white_card p-8 rounded-3xl shadow-md text-center flex flex-col gap-4"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-20">
            <img
              src="/SVG/Datos.svg"
              alt="Cantidad de comidas"
              className="w-auto h-auto"
            />
          </div>
          <div className="poppins-bold text-2xl">
            <h2>Crear Cuenta</h2>
          </div>
        </div>

        {/* Nombre */}
        <label
          htmlFor="nombre"
          className="text-gray-700 font-semibold text-left w-full"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Apodo */}
        <label
          htmlFor="apodo"
          className="text-gray-700 font-semibold text-left w-full"
        >
          Apodo
        </label>
        <input
          id="apodo"
          type="text"
          name="apodo"
          placeholder="Ingresa tu apodo"
          value={formData.apodo}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Correo */}
        <label
          htmlFor="correo"
          className="text-gray-700 font-semibold text-left w-full"
        >
          Correo electrónico
        </label>
        <input
          id="correo"
          type="email"
          name="correo"
          placeholder="Ingresa tu correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Contraseña */}
        <label
          htmlFor="contraseña"
          className="text-gray-700 font-semibold text-left w-full"
        >
          Contraseña
        </label>
        <input
          id="contraseña"
          type="password"
          name="contraseña"
          placeholder="Ingresa tu contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <button
          type="submit"
          className="w-40 md:w-80 mx-auto bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer mt-4"
        >
          Crear Cuenta
        </button>
      </form>

      <div className="absolute top-5 left-5 z-10 w-10">
        <Link to={"/"}>
          <img
            src="/SVG/Flecha.svg"
            alt="Volver al inicio"
            className="w-auto h-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Fondo decorativo abajo */}
      <div className="absolute bottom-0 left-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack1.png"
          alt="Decoración"
          className="w-auto h-auto"
        />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack2.png"
          alt="Decoración"
          className="w-auto h-auto"
        />
      </div>
    </div>
  );
}
