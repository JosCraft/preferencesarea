import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, IOpcion, Ipregunta } from '../../../../interface/interface';

const ChartLineMn = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [ni, setNi] = useState<number[]>([]);
  const [Ni, setNiAcumulada] = useState<number[]>([]);

  const pregunta: Ipregunta = JSON.parse(localStorage.getItem('pregunta') || '{}') as Ipregunta;

  useEffect(() => {
    fetchRespuestas();
  }, []);

  const fetchRespuestas = async () => {
    const response = await apiService.get(`respuestas/${pregunta?.id || 0}`);
    setRespuestas(response);

    // Calcular `ni` y `Ni` después de obtener las respuestas
    calcularFrecuencias(response);
  };

  const calcularFrecuencias = (respuestas: Irespuesta[]) => {
    // Extraer las clases únicas (respuesta_libre)
    const clases = [...new Set(respuestas.map((respuesta) => respuesta.respuesta_libre))];

    // Calcular la frecuencia de cada clase (ni)
    const frecuencias = clases.map(
      (clase) => respuestas.filter((respuesta) => respuesta.respuesta_libre === clase).length
    );

    setNi(frecuencias);

    // Calcular frecuencia acumulada (Ni)
    const acumulada = frecuencias.reduce<number[]>((acc, current, index) => {
      const total = index === 0 ? current : current + acc[index - 1];
      acc.push(total);
      return acc;
    }, []);

    setNiAcumulada(acumulada);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Gráfico de Líneas (Ni)</h3>
      <LineChart
        xAxis={[
          {
            id: 'categories',
            data: ni.map((_, index) => `Clase ${index + 1}`), // Etiquetas de las clases
            scaleType: 'band',
          },
        ]}
        series={[
          {
            id: 'Ni',
            data: Ni, // Los valores de la frecuencia acumulada
            label: 'Ni',
            color: '#28A745', // Color verde para la línea
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default ChartLineMn;
