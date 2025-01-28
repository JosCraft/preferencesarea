import React, { useEffect, useState } from 'react';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, Ipregunta } from "../../../../interface/interface";
import { LineChart } from '@mui/x-charts/LineChart';

interface IDatosProcesados {
  opcion: string;
  ni: number;
  Ni: number;
  niMultiplicado: number;
  fi: number;
  Fi: number;
  FiMultiplicado: number;
  fiPorcentaje: number;
  FiPorcentaje: number;
  FiMultiplicadoPorcentaje: number;
}

const ChartLine = () => {
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

  const procesarDatos = () => {
    const procesarRespuestas = (clases, respuestas) => {
      const ni = clases.map((clase) => respuestas.filter((respuesta) => respuesta.id_opcion === clase.id).length);

      const Ni = ni.reduce((acc, current, index) => {
        const total = index === 0 ? current : current + acc[index - 1];
        acc.push(total);
        return acc;
      }, []);

      const niMultiplicado = ni.reverse().reduce((acc, current, index) => {
        const sum = acc[acc.length - 1] ? acc[acc.length - 1] + current : current;
        acc.push(sum);
        return acc;
      }, []).reverse();

      return { ni, Ni, niMultiplicado };
    };

    let clases = [];
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

    const { ni, Ni, niMultiplicado } = procesarRespuestas(clases, respuestas);

    const processedData = clases.map((clase, index) => ({
      opcion: clase.opcion,
      marca: clase.marca,
      ni: ni[index] || 0,
      Ni: Ni[index] || 0,
      niMultiplicado: niMultiplicado[index] || 0
    }));

    setDatosProcesados(processedData);
  };

  useEffect(() => {
    if (respuestas.length > 0) {
      procesarDatos();
    }
  }, [respuestas]);

  // Aquí definimos las categorías y valores que se pasan al gráfico
  const categories = datosProcesados.map((data) => data.opcion); // Las categorías son las opciones de respuesta
  const niValues = datosProcesados.map((data) => data.Ni); // Los valores de ni para la frecuencia
  const niMultiplicadoValues = datosProcesados.map((data) => data.niMultiplicado); // Los valores de Ni*i para la frecuencia acumulada

  return (
    <div>
      <LineChart
        xAxis={[{
          id: 'categories',
          data: categories, // Opciones de respuesta como eje X
          label: 'Opciones',
          scaleType: 'band', // Eje X categórico
        }]}
        series={[
          {
            id: 'Ni',
            data: niValues, // Frecuencia Ni
            label: 'Ni',
            color: '#007BFF', // Azul para Ni
            type: 'line',
            point: { size: 5, color: '#007BFF' },
            fill: true,
            strokeWidth: 2,
          },
          {
            id: 'NiMultiplicado',
            data: niMultiplicadoValues, // Frecuencia Ni multiplicado
            label: 'Ni *',
            color: '#28A745', // Verde para Ni*
            type: 'line',
            point: { size: 5, color: '#28A745' },
            fill: true,
            strokeWidth: 2,
          },
        ]}
        width={800}
        height={600}
      />
    </div>
  );
}

export default ChartLine;
