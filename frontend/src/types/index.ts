export type Genero = 'Hombre' | 'Mujer'

export type Objetivo = 'Bajar de peso' | 'Mantener' | 'Ganar masa muscular'

export type Actividad = 'No hago ejercicio' | 'Ocasional (1-2 veces por semana)' | 'Regular (3-4 veces por semana)' | 'Frecuente (5 o más veces)'

export type TieneEnfermedad = 'Sí' | 'No'

export type TipoDieta = 'Presupuesto' | 'Disponible'
// export type Cardiovasculares = 'Hipertensión arterial' | 'Hipercolesterolemia' | 'Triglicéridos elevados'

// export type Digestivas = 'Enfermedad celiaca' | 'Intolerancia a la lactosa' | 'Síndrome de intestino irritable' | 'Enfermedad de Crohn / Colitis Ulcerosa'

// export type Metabolicas = 'Diabetes tipo 1 y tipo 2' | 'Resistencia a la insulina/prediabetes' | 'Hipotiroidismo' | 'Sindrome metabólico'

export type FormData = {
  edad: number;
  genero: Genero;
  peso: number;
  altura: number;
  objetivo: Objetivo;
  actividad: Actividad;
  tieneEnfermedad: TieneEnfermedad;
  enfermedad: string
  tipoDieta: TipoDieta
};