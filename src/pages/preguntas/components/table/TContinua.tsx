import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  FiPorcentaje: number;  // Nueva columna para Fi%
  FiMultiplicadoPorcentaje: number;  // Nueva columna para F*i%
}

const TContinua = () => {
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
    // Función para procesar las respuestas y calcular las estadísticas
    const procesarRespuestas = (clases, respuestas) => {
      // Contar las respuestas por clase
      const ni = clases.map((clase) => respuestas.filter((respuesta) => respuesta.id_opcion === clase.id).length);
  
      // Calcular la frecuencia acumulada Ni
      const Ni = ni.reduce((acc, current, index) => {
        const total = index === 0 ? current : current + acc[index - 1];
        acc.push(total);
        return acc;
      }, []);
  
      // Calcular la frecuencia relativa fi
      const fi = ni.map((n) => (n / respuestas.length).toFixed(3));
  
      // Calcular el porcentaje fi%
      const fiPorcentaje = fi.map((f) => (parseFloat(f) * 100).toFixed(3));
  
      // Calcular la frecuencia acumulada multiplicada Ni (ni acumulado desde el último hacia el primero)
      const niMultiplicado = ni.reverse().reduce((acc, current, index) => {
        const sum = acc[acc.length - 1] ? acc[acc.length - 1] + current : current;
        acc.push(sum);
        return acc;
      }, []).reverse();
  
      // Calcular la frecuencia acumulada Fi
      const Fi = fi.reduce((acc, current, index) => {
        const total = index === 0 ? parseFloat(current) : parseFloat((parseFloat(current) + acc[index - 1]).toFixed(3));
        acc.push(total);
        return acc;
      }, []);
  
      // Calcular F*i (frecuencia acumulada multiplicada por fi)
      const FiMultiplicado = fi.map((f, index) => (parseFloat(f) * Ni[index]).toFixed(3));
  
      return { ni, Ni, niMultiplicado, fi, Fi, FiMultiplicado, fiPorcentaje };
    };
  
    let clases = [];
  
    // Dependiendo de la pregunta, se asignan las clases correspondientes
    if (pregunta.id === 6) {
      clases = [
        { id: 12, opcion: "Ninguno", marca: 0 },
        { id: 13, opcion: "6 meses", marca: 0.5 },
        { id: 14, opcion: "1 a 2 años", marca: 1.5 },
        { id: 15, opcion: "2 a 10 años", marca: 6 }
      ];
    } else {
      clases = [
        { id: 16, opcion: "Ninguno", marca: 0 },
        { id: 17, opcion: "1 a 2 años", marca: 1.5 },
        { id: 18, opcion: "2 a 5 años", marca: 3.5 },
        { id: 19, opcion: "Más de 5 años", marca: 6 }
      ];
    }
  
    // Procesar las respuestas de acuerdo a las clases y respuestas actuales
    const { ni, Ni, niMultiplicado, fi, Fi, FiMultiplicado, fiPorcentaje } = procesarRespuestas(clases, respuestas);
  
    // Preparar los datos procesados para la tabla
    const processedData = clases.map((clase, index) => ({
      opcion: clase.opcion,
      marca:clase.marca,
      ni: ni[index] || 0,
      Ni: Ni[index] || 0,
      niMultiplicado: niMultiplicado[index] || 0,
      fi: fi[index] || 0,
      Fi: Fi[index] || 0,
      FiMultiplicado: FiMultiplicado[index] || 0,
      fiPorcentaje: fiPorcentaje[index] || 0,
      FiPorcentaje: (parseFloat(fiPorcentaje[index]) * 100).toFixed(3),
      FiMultiplicadoPorcentaje: (parseFloat(FiMultiplicado[index]) * 100).toFixed(3)
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
        <TableHead className="w-[100px] text-white px-4 py-2 text-center">yi-yj</TableHead>
          <TableHead className="w-[100px] text-white px-4 py-2 text-center">xi</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">ni</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">Ni</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">N*i</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">fi</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">Fi</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">F*i</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">fi%</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">Fi%</TableHead>
          <TableHead className="px-4 py-2 text-white text-center">F*i%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datosProcesados.map((data, index) => (
          <TableRow key={index} className={`border-t ${index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'} hover:bg-gray-100`}>
            <TableCell className="px-4 py-2 text-left font-medium text-gray-700">{data.opcion}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.marca}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.ni}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.Ni}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.niMultiplicado}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.fi}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.Fi}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.FiMultiplicado}</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.fiPorcentaje}%</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.FiPorcentaje}%</TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-700">{data.FiMultiplicadoPorcentaje}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TContinua;
