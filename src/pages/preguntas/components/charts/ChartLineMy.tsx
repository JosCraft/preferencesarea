import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, IOpcion, Ipregunta } from '../../../../interface/interface';

const ChartLineMy = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [ni, setNi] = useState<number[]>([]);
  const [niMultiplicado, setNiMultiplicado] = useState<number[]>([]);

  const pregunta: Ipregunta = JSON.parse(localStorage.getItem('pregunta') || '{}') as Ipregunta;

  useEffect(() => {
    fetchRespuestas();
  }, []);

  const fetchRespuestas = async () => {
    const response = await apiService.get(`respuestas/${pregunta?.id || 0}`);
    setRespuestas(response);

    // Calcular `ni` y `niMultiplicado` después de obtener las respuestas
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

    // Calcular ni acumulado desde el último elemento hacia el primero
    let acumulado = 0;
    const acumulados = [];
    for (let i = frecuencias.length - 1; i >= 0; i--) {
      acumulado += frecuencias[i];
      acumulados.unshift(acumulado); // Insertar al principio para mantener el orden correcto
    }

    setNiMultiplicado(acumulados);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Gráfico de Líneas (N*i)</h3>
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
            id: 'niMultiplicado',
            data: niMultiplicado, // Los valores acumulados
            label: 'N*i',
            color: '#007BFF', // Color azul para la línea
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default ChartLineMy;
