import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log({ email, contrasena });
  };

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="bg_white_card w-80 h-auto sm:w-xl lg:w-3xl p-8 rounded-3xl shadow-md text-center">
            <div className="flex items-center justify-center gap-5 mb-20">
              <img className="w-15" src="/SVG/Icono.svg" alt="Icono" />
              <h2 className="text-lg font_brown poppins-bold">
                Iniciar sesión
              </h2>
            </div>
            <div className="my-15">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:px-30 lg:px-50"
              >
                <div className="text-left">
                  <label className="block text-sm font-medium font_brown mb-1">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full px-4 py-2 rounded-full bg_inputs focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-sm font-medium font_brown mb-1">
                    Contraseña
                  </label>
                  <input
                    type="contrasena"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="w-full px-4 py-2 rounded-full bg_inputs focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg_yellow font_brown poppins-medium py-2 rounded-full cursor-pointer"
                >
                  Iniciar sesión
                </button>
              </form>

              <p className="mt-4 text-sm font_brown poppins-light">
                ¿Haz olvidado la contraseña?{" "}
                <Link to="#" className="font-semibold hover:underline">
                  Restablecer
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-10 w-35 sm:w-3xs ">
        <img
          src="/Background/FrutaBack1.png"
          alt="Logo NutrIA"
          className="w-auto h-auto"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack2.png"
          alt="Logo NutrIA"
          className="w-auto h-auto"
        />
      </div>
    </>
  );
}
