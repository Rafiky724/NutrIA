export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login"
} as const;

export const DIET_ENDPOINTS = {
  CREATE: "/dieta/create",
  START: "/dieta/iniciar",
} as const;

export const PLAN_ENDPOINTS = {
  MACROS_DAILY: "/plan/macros",
  ACTUALIZAR_DIA: "/plan/dia_actualizar",
  CAMBIAR_TIPO_DIETA: "/plan/cambiar_tipo_dieta",
  CAMBIAR_DIA_ACTUALIZAR: "/plan/cambiar_dia_actualizar",
} as const;

export const OBJECTIVE_ENDPOINTS = {
  DATES: "/objetivo/fechas",
} as const;

export const DAYS_ENDPOINTS = {
  BY_NAME: (day: string) => `/dias/${day}`,

  EDIT_FOOD: (day: string, typeFood: string) =>
    `/dias/${day}/comidas/${typeFood}/editar`,

  REGENERATE_FOOD: (day: string, typeFood: string) =>
    `/dias/${day}/comidas/${typeFood}/regenerar`,

} as const;

export const USER_ENDPOINTS = {
  HAS_PLAN: "/user/tiene-plan",
  PROGRESS: "/user/progress",
  PESO: "/user/peso",
  UPDATE_PESO: "/user/actualizar_peso",
} as const;

export const HOME_ENDPOINTS = {
  GET_HOME: "/home/"
} as const;

export const DESPENSA_ENDPOINTS = {
  GET_INGREDIENTES: "/despensa/ingredientes",
} as const;