import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type { FormData as NutriaFormData, RegisterForm } from "../../types";
import { loginUser, registerUser } from "../../services/authService";
import { mapToRegisterRequest } from "../../utils/mappers";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ArrowReturn from "../../components/Decoration/ArrowReturn";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import Toast from "../../components/Toast/Toast";

export default function Register() {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<RegisterForm>({
    nombre: "",
    apodo: "",
    correo: "",
    contraseña: "",
  });

  const showToast = (
    message: string,
    type: "error" | "success" | "warning" | "info" = "error",
  ) => {
    setToast({
      open: true,
      message,
      type,
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    return regex.test(password);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.nombre.trim()) {
      return showToast("El nombre es obligatorio");
    }

    if (formData.nombre.trim().length < 3) {
      return showToast("El nombre debe tener mínimo 3 caracteres");
    }

    if (formData.nombre.trim().length > 30) {
      return showToast("El nombre no puede superar los 30 caracteres");
    }

    if (!formData.apodo.trim()) {
      return showToast("El apodo es obligatorio");
    }

    if (formData.apodo.trim().length < 3) {
      return showToast("El apodo debe tener mínimo 3 caracteres");
    }

    if (formData.apodo.trim().length > 20) {
      return showToast("El apodo no puede superar los 20 caracteres");
    }

    if (!formData.correo.trim()) {
      return showToast("El correo es obligatorio");
    }

    if (!validateEmail(formData.correo)) {
      return showToast("Ingresa un correo electrónico válido");
    }

    if (!formData.contraseña.trim()) {
      return showToast("La contraseña es obligatoria");
    }

    if (!validatePassword(formData.contraseña)) {
      return showToast(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
      );
    }

    setLoading(true);

    const nutriaRaw = localStorage.getItem("datosNutrIA");

    if (!nutriaRaw) {
      console.error("No existen datos en datosNutrIA");
      setLoading(false);
      return;
    }

    let nutriaForm: NutriaFormData;

    try {
      nutriaForm = JSON.parse(nutriaRaw);
    } catch {
      console.error("datosNutrIA está corrupto");
      setLoading(false);
      return;
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
    } catch (error: any) {
      const backendMessage = error.response?.data?.detail;

      let message = "Error en el registro";

      if (backendMessage?.toLowerCase().includes("correo")) {
        message = "Este correo ya está registrado";
      } else if (backendMessage) {
        message = backendMessage;
      }

      showToast(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen
        title="CREANDO CUENTA"
        subtitle="Estamos preparando todo para ti. Esto tomará unos segundos..."
        loading={loading}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center px-4 sm:px-6 md:px-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-md text-center flex flex-col gap-4 z-50"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
          <div className="w-12 sm:w-20">
            <img
              src="/SVG/IconsGeneral/DataIcon.svg"
              alt="Crear cuenta"
              className="w-full h-auto"
            />
          </div>

          <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
            <h2>Crear Cuenta</h2>
          </div>
        </div>

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
              type="text"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              className="w-full px-4 py-2 rounded-3xl bg-input ft-light text-sm sm:text-base"
            />
          </div>

          <div className="relative flex flex-col">
            <label
              htmlFor="contraseña"
              className="block text-brown ft-medium text-left mb-1"
            >
              Contraseña
            </label>

            <input
              id="contraseña"
              name="contraseña"
              type={showPassword ? "text" : "password"}
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 rounded-3xl bg-input ft-light text-sm sm:text-base"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 transform cursor-pointer"
            >
              <img
                src={
                  showPassword
                    ? "/SVG/IconsGeneral/eyeOpen.svg"
                    : "/SVG/IconsGeneral/eyeClosed.svg"
                }
                alt="toggle password visibility"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-64 md:w-72 mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl mt-6 text-sm sm:text-base hover:scale-105 transition cursor-pointer"
        >
          Crear Cuenta
        </button>
      </form>

      <ArrowReturn />

      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
