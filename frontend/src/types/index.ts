export type CategoryWithIngredients = [string, ...string[]];

export type FormData = {
  fecha_nacimiento: string;
  genero: string;
  peso_actual: number;
  altura_cm: number;
  tipo_objetivo: string;
  peso_objetivo: number;
  velocidad_dieta: string;
  nivel_actividad: string;
  tieneEnfermedad: string;
  enfermedad: string;
  tipo_dieta: string;
  tipo_actividad: string;
  presupuesto: string;
  cantidad_comidas: string[];
  ingredientes: CategoryWithIngredients[];
};

export type LoginRequest = {
  email: string;
  password: string;
}

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
}

export type Gender = "Femenino" | "Masculino";
export type LevelActivity = "NoHace" | "Bajo" | "Moderado" | "Alto";
export type HasDisease = "Sí" | "No";
export type TargetType = "PerderPeso" | "MantenerPeso" | "GanarMasaMuscular" | "";
export type TypeDiet = "Disponible" | "Presupuesto";
export type Budget = "Muy bajo" | "Bajo" | "Estándar" | "Alto" | "Muy alto";
export type TypeActivity =
  | "Pesas / Gimnasio"
  | "Cardio (correr, nadar, bici...)"
  | "Funcional / CrossFit"
  | "Yoga / Movilidad";
export type Meal = {
  label: string;
  icon: string;
  selectedIcon: string;
};

export type SpeedDiet = "Lenta" | "Moderada" | "Rápida";

export type RegisterRequest = {
  apodo: string;
  nombre_completo: string;
  email: string;
  password: string;
  genero: Gender;
  fecha_nacimiento: string;
  altura_cm: number;
  peso_actual: number;
  nivel_actividad: LevelActivity;
  tipo_objetivo: TargetType;
  peso_objetivo: number;
  cantidad_comidas: string[];
  enfermedad: string;
  tipo_actividad: string;
  tipo_dieta: TypeDiet;
  velocidad_dieta: SpeedDiet;
  ingredientes: CategoryWithIngredients[];
};

export type RegisterForm = {
  nombre: string;
  apodo: string;
  correo: string;
  contraseña: string;
};

export type Macros = {
  calorias_diarias: number;
  proteinas_diarias: number;
  carbohidratos_diarios: number;
  grasas_diarias: number;
};

export type TargetDates
  = {
    fecha_inicio: string; // YYYY-MM-DD
    fecha_estimada: string; // YYYY-MM-DD
  };

export type TypeFood =
  | "Desayuno"
  | "Almuerzo"
  | "Cena"
  | "Snack 1"
  | "Snack 2"
  | "Snack 3";

export type Days =
  | "Lunes"
  | "Martes"
  | "Miercoles"
  | "Jueves"
  | "Viernes"
  | "Sabado"
  | "Domingo";

export type Ingredient = {
  nombre: string;
  tipo: string;
  cantidad: string;
  calorias_ingrediente: number;
  proteinas_ingrediente: number;
  carbohidratos_ingrediente: number;
  grasas_ingrediente: number;
};

export type MealData = {
  tipo_comida: string;
  hora_sugerida: string | null;
  hora_real: string | null;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  completada: boolean;
  verificada: boolean;
  ingredientes: Ingredient[];
  precio_estimado: number;
};

export type DayPlan = {
  dia_semana: string;
  calorias_totales: number;
  proteinas_totales: number;
  carbohidratos_totales: number;
  grasas_totales: number;
  costo_total: number | null;
  completado: boolean;
  comidas: MealData[];
  opinion_ia?: string;
};

export interface MacrosConsumedToday {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  calorias_objetivo: number;
  proteinas_objetivo: number;
  carbohidratos_objetivo: number;
  grasas_objetivo: number;
  seguimiento_racha: number[];
}

export interface NextMeal {
  tipo_comida: string;
  hora_sugerida: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  precio_estimado: number;
  ingredientes: Ingredient[];
}

export interface User {
  nombre: string;
  cantidad_gemas: number;
  numero_racha: number;
}

export interface HomeResponse {
  usuario: User;
  macros_consumidos_hoy: MacrosConsumedToday;
  proxima_comida: NextMeal | null;
  dia_actual: DayPlan;
  hay_dieta_hoy?: boolean;
  mensaje?: string;
}

export type EditFoodResponse = {
  success: boolean;
  mensaje: string;
  comida?: MealData;
};

export type RegenerateDayResponse = {
  dia: DayPlan;
  opinion_ia?: string;
};

export type DatesTargetResponse = {
  fecha_inicio: string;    // YYYY-MM-DD
  fecha_estimada: string;  // YYYY-MM-DD
};

export type IngredientItem = {
  nombre: string;
  icono?: string;
};

export type IngredientCategory = {
  nombre: string;
  minimo: number;
  items: IngredientItem[];
};