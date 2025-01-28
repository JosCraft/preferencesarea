import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { apiService } from '../../../../services/apiService';
import { Irespuesta, Ipregunta } from "../../../../interface/interface";

interface IDatosProcesados {
  opcion: string;
  ni: number;
  Ni: number;
  niMultiplicado: number;
  fi: number;
  Fi: number;
  FiMultiplicado: number;
  fiPorcentaje: number;
}

const TCuantitativa = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [datosProcesados, setDatosProcesados] = useState<IDatosProcesados[]>([]);

  const pregunta: Ipregunta = JSON.parse(localStorage.getItem('pregunta') || '{}') as Ipregunta;

  useEffect(() => {
    if (pregunta && respuestas.length === 0) {
      fetchRespuestas();
    }
  }, [pregunta, respuestas]);

  const fetchRespuestas = async () => {
    const response = await apiService.get(`respuestas/${pregunta?.id || 0}`);
    setRespuestas(response);
  };

  // Función para procesar todos los datos de las respuestas
  const procesarDatos = () => {
    // Extraer las clases (respuesta_libre) de las respuestas (sin duplicados)
    const clases = [...new Set(respuestas.map((respuesta) => respuesta.respuesta_libre))];
  
    // Calcular la frecuencia de cada clase (ni)
    const ni = clases.map((clase) => respuestas.filter((respuesta) => respuesta.respuesta_libre === clase).length);
  
    // Calcular la frecuencia acumulada Ni
    const Ni = ni.reduce((acc, current, index) => {
      const total = index === 0 ? current : current + acc[index - 1];
      acc.push(total);
      return acc;
    }, []);
  
    // Calcular la frecuencia relativa fi
    const fi = ni.map((n) => (n / respuestas.length).toFixed(3));
  
    
  
    // Calcular N*i (ni acumulado desde el último elemento hacia el primero)
    const niMultiplicado: number[] = [];
    let sum:number = 0;
    for (let i = ni.length - 1; i >= 0; i--) {
      sum += ni[i];
      niMultiplicado.unshift(sum); // Agregar al inicio para obtener el orden correcto
    }
  
    // Calcular la frecuencia relativa acumulada Fi (en decimales)
    const Fi = fi.reduce((acc, current, index) => {
      const total = index === 0 
        ? parseFloat(current) 
        : parseFloat((parseFloat(current) + acc[index - 1]).toFixed(3)); // Sumar y formatear a 3 decimales
      acc.push(total);
      return acc;
    }, []);
    sum = 0;
    // Calcular FiMultiplicado (frecuencia relativa acumulada desde el último elemento hacia el primero)
    const FiMultiplicado: number[] = [];
    for (let i = fi.length - 1; i >= 0; i--) {
      sum = parseFloat((sum + parseFloat(fi[i])).toFixed(3)); // Sumar y formatear a 3 decimales
      FiMultiplicado.unshift(sum); // Agregar al inicio para mantener el orden
    }

  
    // Calcular el porcentaje fi%
    const fiPorcentaje = fi.map((f) => (parseFloat(f) * 100).toFixed(3));
  
    // Preparar los datos procesados para la tabla
    const processedData = clases.map((clase, index) => ({
      opcion: clase,
      ni: ni[index] || 0,
      Ni: Ni[index] || 0,
      niMultiplicado: niMultiplicado[index] || 0,
      fi: fi[index] || 0,
      Fi: Fi[index] || 0,
      FiMultiplicado: FiMultiplicado[index] || 0,
      fiPorcentaje: fiPorcentaje[index] || 0,
    }));
  
    setDatosProcesados(processedData);
  };
  
  // Llamar a la función para procesar los datos después de que las respuestas estén cargadas
  useEffect(() => {
    if (respuestas.length > 0) {
      procesarDatos();
    }
  }, [respuestas]);

  return (
<Table className="min-w-full table-auto bg-emerald-100 border-separate border-spacing-2">
  <TableCaption className="text-lg font-semibold text-white mb-4">Tabla de Frecuencias</TableCaption>
  <TableHeader>
    <TableRow className="bg-emerald-600 text-white text-lg">
      <TableHead className="w-[100px] text-white  px-4 py-2 text-center">xi</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">ni</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">Ni</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">N*i</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">fi</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">Fi</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">F*i</TableHead>
      <TableHead className="px-4 py-2 text-white text-center">fi%</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {datosProcesados.map((data, index) => (
      <TableRow key={index} className={`border-t ${index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'} hover:bg-gray-100`}>
        <TableCell className="px-4 py-2 text-left font-medium text-gray-700">{data.opcion}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.ni}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.Ni}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.niMultiplicado}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.fi}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.Fi}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.FiMultiplicado}</TableCell>
        <TableCell className="px-4 py-2 text-center text-gray-700">{data.fiPorcentaje}%</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

  );
};

export default TCuantitativa;
