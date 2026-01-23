import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ResetModal from "../../components/Modals/ResetModal";
import { loginUser } from "../../services/authService";
import { getHasPlan } from "../../services/userService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ArrowReturn from "../../components/Decoration/ArrowReturn";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import LoadingIcon from "../../assets/Loading/LoadingIcon.svg?react";
import Toast from "../../components/Toast/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  // Limpiar token al entrar en esta página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
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
    setLoading(true);
    try {
      // Login
      const response = await loginUser({ email, password });
      // Verificar si tiene plan
      const HasPlanResponse = await getHasPlan();
      // Guardar token
      localStorage.setItem("token", response.access_token);
      // Redirección según plan
      if (HasPlanResponse.has_plan) {
        navigate("/PreHome", { replace: true });
        // navigate("/Home", { replace: true });
      } else {
        navigate("/TodoListo", { replace: true });
      }
    } catch (error: unknown) {
      // Borrar token
      localStorage.removeItem("token");
      // Type guard para chequear si error tiene response.status
      const status =
        typeof error === "object" && error !== null && "response" in error
          ? (error as { response: { status: number } }).response.status
          : null;

      if (status === 401) {
        setToast({
          open: true,
          message: "Correo o contraseña incorrectos.",
          type: "error",
        });
      } else {
        setToast({
          open: true,
          message: "Ocurrió un error. Intenta nuevamente.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen
        Icon={LoadingIcon}
        title="CARGANDO"
        subtitle={`Esto puede tardar unos segundos.\nEstamos creando tu dieta personalizada`}
      />
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white w-80 h-auto sm:w-xl lg:w-3xl p-8 rounded-3xl shadow-md text-center">
            <div className="flex items-center justify-center gap-5 mb-20">
              <img
                className="w-15"
                src="/SVG/IconsGeneral/DataIcon.svg"
                alt="Icono"
              />
              <h2 className="text-xl text-brown ft-bold">Iniciar sesión</h2>
            </div>
            <div className="my-15">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:px-30 lg:px-50"
              >
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
                    className="w-full px-4 py-2 rounded-full bg-input"
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="password"
                    className="text-sm ft-medium text-brown mb-1 ml-2"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="*********"
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-4 py-2 rounded-full bg-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow text-brown ft-medium py-2 rounded-full cursor-pointer mt-4"
                >
                  Iniciar sesión
                </button>
              </form>

              <p className="mt-4 text-sm text-brown ft-light">
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
        </div>
      </div>

      <ArrowReturn />

      <div className="absolute bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitLeft />
      </div>

      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitRight />
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />

      <ResetModal isOpen={viewModal} onClose={() => setViewModal(false)} />
    </>
  );
}
