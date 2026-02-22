import { Route, Routes } from "react-router-dom";
import Form from "../pages/Form/Form";
import Init from "../pages/Home/Init";
import Login from "../pages/Auth/Login";
import DailyNutritionPlan from "../pages/Plan/DailyNutritionPlan";
import GoalProjection from "../pages/Plan/GoalProjection";
import RouteProtection from "../components/Protected/RouteProtection";
import WeeklyMealPlan from "../pages/Plan/WeeklyMealPlan";
import DietCreationReady from "../pages/Onboarding/DietCreationReady";
import DietPlanReady from "../pages/Onboarding/DietPlanReady";
import StartDiet from "../pages/Onboarding/StartDiet";
import UpdateDietDay from "../pages/Onboarding/UpdateDietDay";
import LoadingPage from "../pages/Loading/Loading";
import Register from "../pages/Auth/Register";
import HomeLayout from "../pages/Home/HomeLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/loading" element={<LoadingPage />}></Route>
      <Route path="/" element={<Init />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/form" element={<Form />}></Route>
      <Route path="/register" element={<Register />}></Route>

      {/* Rutas protegidas */}
      <Route element={<RouteProtection />}>
        <Route
          path="/dietCreationReady"
          element={<DietCreationReady />}
        ></Route>
        <Route path="/dietPlanReady" element={<DietPlanReady />}></Route>
        <Route
          path="/dailyNutritionPlan"
          element={<DailyNutritionPlan />}
        ></Route>
        <Route path="/goalProjection" element={<GoalProjection />}></Route>
        <Route path="/weeklyMealPlan" element={<WeeklyMealPlan />}></Route>
        <Route path="/startDiet" element={<StartDiet />}></Route>
        <Route path="/updateDietDay" element={<UpdateDietDay />}></Route>
        <Route path="/homeLayout" element={<HomeLayout />}></Route>
      </Route>
    </Routes>
  );
}
