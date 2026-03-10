import type {
  Gender, LevelActivity, RegisterRequest, FormData, TargetType,
  SpeedDiet,
  RegisterForm
} from "../types";

const nivelActividadMap: Record<string, LevelActivity> = {
  "Nada": "NoHace",
  "No hace": "NoHace",
  "Bajo": "Bajo",
  "Regular": "Moderado",
  "Alto": "Alto"
};

const generoMap: Record<string, Gender> = {
  Mujer: "Femenino",
  Hombre: "Masculino"
};

const objetivoMap: Record<string, TargetType> = {
  Perder: "PerderPeso",
  Mantener: "MantenerPeso",
  Ganar: "GanarMasaMuscular"
};

const velocidadMap: Record<string, SpeedDiet> = {
  Lenta: "Lenta",
  Moderada: "Moderada",
  Rápida: "Rápida",
};

export const mapToRegisterRequest = (
  form: FormData,
  user: RegisterForm
): RegisterRequest => ({
  apodo: user.apodo,
  nombre_completo: user.nombre,
  email: user.correo,
  password: user.contraseña,

  genero: generoMap[form.genero] ?? "Femenino",
  fecha_nacimiento: form.fecha_nacimiento,
  altura_cm: form.altura_cm,
  peso_actual: form.peso_actual,

  nivel_actividad:
    nivelActividadMap[form.nivel_actividad] ?? "NoHace",

  tipo_objetivo:
    objetivoMap[form.tipo_objetivo] ?? "MantenerPeso",

  peso_objetivo: form.peso_objetivo,

  cantidad_comidas: form.cantidad_comidas,

  enfermedad:
    form.tieneEnfermedad === "No"
      ? ""
      : form.enfermedad,

  tipo_actividad: form.tipo_actividad,

  tipo_dieta: form.tipo_dieta === "Presupuesto"
    ? "Presupuesto"
    : "Disponible",

  velocidad_dieta:
    velocidadMap[form.velocidad_dieta] ?? "Moderada",

  ingredientes: Array.isArray(form.ingredientes) ? form.ingredientes.map(([categoria, items]) => [
    categoria, ...(Array.isArray(items) ? items : []),]) : [],

});
