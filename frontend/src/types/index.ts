export type Genero = 'Hombre' | 'Mujer'

export type Objetivo = 'Bajar de peso' | 'Mantener' | 'Ganar masa muscular'

export type Actividad = 'No hago ejercicio' | 'Ocasional (1-2 veces por semana)' | 'Regular (3-4 veces por semana)' | 'Frecuente (5 o más veces)'

export type TieneEnfermedad = 'Sí' | 'No'

export type TipoDieta = 'Presupuesto' | 'Disponible'

export type TipoActividad = 'Pesas / Gimnasio' | 'Cardio (correr, nadar, bici...)' | 'Funcional / CrossFit' | 'Yoga / Movilidad'

export type Presupuesto = 'Muy bajo' | 'Bajo' | 'Estándar' | 'Alto' | 'Muy alto'

export type FormData = {
  edad: number;
  genero: Genero;
  peso: number;
  altura: number;
  objetivo: Objetivo;
  actividad: Actividad;
  tieneEnfermedad: TieneEnfermedad;
  enfermedad: string;
  tipoDieta: TipoDieta;
  tipoActividad: TipoActividad;
  presupuesto: Presupuesto;
};