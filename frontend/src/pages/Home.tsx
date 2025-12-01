import { useEffect, useState } from "react";
import type { FormData } from "../types";

export default function Home() {
  const [datos, setDatos] = useState<FormData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("datosNutrIA");
    if (stored) {
      setDatos(JSON.parse(stored));
    }
  }, []);

  if (datos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-xl">No hay datos guardados aún.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-brown">Datos guardados</h1>
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {datos.map((dato, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <p>
                <span className="font-semibold">Edad:</span> {dato.edad}
              </p>
              <p>
                <span className="font-semibold">Género:</span> {dato.genero}
              </p>
              <p>
                <span className="font-semibold">Peso:</span> {dato.peso}
              </p>
              <p>
                <span className="font-semibold">Altura:</span> {dato.altura}
              </p>
              <p>
                <span className="font-semibold">Objetivo:</span> {dato.objetivo}
              </p>
              <p>
                <span className="font-semibold">Actividad:</span>{" "}
                {dato.actividad}
              </p>
              <p>
                <span className="font-semibold">Enfermedad:</span>{" "}
                {dato.enfermedad || "No aplica"}
              </p>
              <p>
                <span className="font-semibold">Tipo de dieta:</span>{" "}
                {dato.tipoDieta}
              </p>
              <p>
                <span className="font-semibold">Presupuesto:</span>{" "}
                {dato.presupuesto}
              </p>
              <p>
                <span className="font-semibold">Tipo de actividad:</span>{" "}
                {dato.tipoActividad}
              </p>
              <p>
                <span className="font-semibold">Cantidad de comidas:</span>{" "}
                {dato.cantidadComidas}
              </p>
              <p>
                <span className="font-semibold">Ingredientes:</span>{" "}
                {dato.ingredientes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
