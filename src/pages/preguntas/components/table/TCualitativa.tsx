import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiService } from "../../../../services/apiService";
import { Irespuesta, Ipregunta, IOpcion } from "../../../../interface/interface";

interface IDatosProcesados {
  opcion: string;
  ni: number;
  fi: number;
  fiPorcentaje: number;
}

const TCualitativa = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [opciones, setOpciones] = useState<IOpcion[]>([]);
  const [datosProcesados, setDatosProcesados] = useState<IDatosProcesados[]>([]);
  const pregunta: Ipregunta = JSON.parse(localStorage.getItem("pregunta") || "{}") as Ipregunta;

  useEffect(() => {
    if (pregunta && respuestas.length === 0) {
      fetchData();
    }
  }, [pregunta]);

  // Fetch respuestas y opciones
  const fetchData = async () => {
    try {
      const [respuestasResponse, opcionesResponse] = await Promise.all([
        apiService.get(`respuestas/${pregunta?.id || 0}`),
        apiService.get(`opciones/${pregunta?.id || 0}`),
      ]);
      setRespuestas(respuestasResponse);
      setOpciones(opcionesResponse);
      console.log("Respuestas:", respuestasResponse);
      console.log("Opciones:", opcionesResponse);
      procesarDatos(respuestasResponse, opcionesResponse);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  // Procesar datos para calcular ni, fi, y fiPorcentaje
  const procesarDatos = (respuestas: Irespuesta[], opciones: IOpcion[]) => {
    const totalRespuestas = respuestas.length;
  
    // Calcular ni, fi, y fiPorcentaje basados en la id de cada opción
    const datosProcesados = opciones.map((opcion) => {
      const ni = respuestas.filter((respuesta) => respuesta.id_opcion === opcion.id).length;
      console.log("ni:", ni);
      const fi = totalRespuestas > 0 ? ni / totalRespuestas : 0;
      const fiPorcentaje = fi * 100;
  
      return {
        opcion: opcion.texto, // Mostrar el texto correspondiente de la opción
        ni,
        fi: parseFloat(fi.toFixed(3)), // Redondear a 3 decimales
        fiPorcentaje: parseFloat(fiPorcentaje.toFixed(2)), // Redondear a 2 decimales
      };
    });
  
    setDatosProcesados(datosProcesados);
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Tabla de Frecuencias Cualitativa</h3>
      <Table className="min-w-full table-auto bg-emerald-100 border-separate border-spacing-2">
        <TableCaption className="text-lg font-semibold text-white mb-4">Tabla de Frecuencias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Opción (xi)</TableHead>
            <TableHead>Frecuencia (ni)</TableHead>
            <TableHead>Frecuencia Relativa (fi)</TableHead>
            <TableHead className="text-right">Frecuencia Relativa (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datosProcesados.length > 0 ? (
            datosProcesados.map((dato, index) => (
              <TableRow key={index}>
                <TableCell>{dato.opcion}</TableCell>
                <TableCell>{dato.ni}</TableCell>
                <TableCell>{dato.fi}</TableCell>
                <TableCell className="text-right">{dato.fiPorcentaje}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay datos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TCualitativa;
