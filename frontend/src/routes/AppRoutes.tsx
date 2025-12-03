import { Route, Routes } from "react-router-dom";
import Form from "../pages/Form";
import Init from "../pages/Init";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Step11 from "../components/formSteps/Step11";
import Home from "../pages/Home";
import PlanDiario from "../pages/PlanDiario";
import ProyeccionObjetivo from "../pages/ProyeccionObjetivo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Init />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
      <Route path="/Form" element={<Form />}></Route>
      <Route path="/Home" element={<Home />}></Route>

      {/* Pantalla para dirigir al register */}
      <Route path="/Step11" element={<Step11 />}></Route>
      {/*  */}

      <Route path="/PlanDiario" element={<PlanDiario />}></Route>
      <Route
        path="/ProyeccionObjetivo"
        element={<ProyeccionObjetivo />}
      ></Route>
    </Routes>
  );
}
