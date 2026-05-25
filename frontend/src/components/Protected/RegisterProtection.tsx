import { Navigate, Outlet } from "react-router-dom";

export default function RegisterProtection() {
  const datosNutria = localStorage.getItem("datosNutrIA");

  if (!datosNutria) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
