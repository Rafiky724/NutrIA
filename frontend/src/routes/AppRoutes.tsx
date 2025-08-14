import { Route, Routes } from "react-router-dom";
import Form from "../pages/Form";
import Init from "../pages/Init";
import Login from "../pages/Login";


export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Init />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Form" element={<Form />}></Route>
    </Routes>
  )
}
