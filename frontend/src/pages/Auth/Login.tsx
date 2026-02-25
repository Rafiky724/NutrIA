import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ResetModal from "../../components/Modals/ResetModal";
import { loginUser } from "../../services/authService";
import { getHasPlan } from "../../services/userService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ArrowReturn from "../../components/Decoration/ArrowReturn";
import Toast from "../../components/Toast/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setToast({
        open: true,
        message: "Completa todos los campos.",
        type: "warning",
      });
      return;
    }

    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.access_token);

      const HasPlanResponse = await getHasPlan();

      if (HasPlanResponse.tiene_plan) {
        navigate("/homeLayout", { replace: true });
      } else {
        navigate("/dietCreationReady", { replace: true });
      }
    } catch (error: unknown) {
      localStorage.removeItem("token");

      const status =
        typeof error === "object" && error !== null && "response" in error
          ? (error as { response: { status: number } }).response.status
          : null;

      setToast({
        open: true,
        message:
          status === 401
            ? "Correo o contraseña incorrectos."
            : "Ocurrió un error. Intenta nuevamente.",
        type: "error",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        {/* Card */}
        <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-3xl shadow-lg text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <img
              className="w-10 sm:w-12"
              src="/SVG/IconsGeneral/DataIcon.svg"
              alt="Icono"
            />
            <h2 className="text-lg sm:text-xl text-brown ft-bold">
              Iniciar sesión
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-left">
              <label
                htmlFor="email"
                className="text-sm ft-medium text-brown ml-2"
              >
                Correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="correo@ejemplo.com"
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-2 rounded-full bg-input focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>

            <div className="text-left">
              <label
                htmlFor="password"
                className="text-sm ft-medium text-brown ml-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="*********"
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-2 rounded-full bg-input focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow text-brown ft-medium py-2.5 rounded-full mt-4 hover:scale-105 transition cursor-pointer"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Reset */}
          <p className="mt-6 text-sm text-brown ft-light">
            ¿Has olvidado la contraseña?{" "}
            <button
              type="button"
              onClick={() => setViewModal(true)}
              className="ft-medium hover:underline cursor-pointer"
            >
              Restablecer
            </button>
          </p>
        </div>
      </div>

      {/* Decoraciones */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>

      <ArrowReturn />

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />

      <ResetModal isOpen={viewModal} onClose={() => setViewModal(false)} />
    </div>
  );
}
