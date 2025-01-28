import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, Ipregunta } from '../../../../interface/interface';

const ChartLineC = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [ni, setNi] = useState<number[]>([]);
  const [niMultiplicado, setNiMultiplicado] = useState<number[]>([]);
  const [Ni, setNiAcumulada] = useState<number[]>([]);
  const [puntosMedios, setPuntosMedios] = useState<number[]>([]);

  const pregunta: Ipregunta = JSON.parse(localStorage.getItem('pregunta') || '{}') as Ipregunta;

  useEffect(() => {
    fetchRespuestas();
  }, []);

  const fetchRespuestas = async () => {
    const response = await apiService.get(`respuestas/${pregunta?.id || 0}`);
    setRespuestas(response);

    // Calcular las frecuencias y los puntos medios
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

    // Calcular N*i (ni acumulado desde el último elemento hacia el primero)
    const acumuladoInverso: number[] = [];
    let sum: number = 0;
    for (let i = frecuencias.length - 1; i >= 0; i--) {
      sum += frecuencias[i];
      acumuladoInverso.unshift(sum);
    }
    setNiMultiplicado(acumuladoInverso);

    // Calcular frecuencia acumulada (Ni)
    const acumulada = frecuencias.reduce<number[]>((acc, current, index) => {
      const total = index === 0 ? current : current + acc[index - 1];
      acc.push(total);
      return acc;
    }, []);
    setNiAcumulada(acumulada);

    // Calcular puntos medios (simulando que las clases están ordenadas como [1, 2, 3, ...])
    const puntos = clases.map((_, index) => (index + 0.5)); // Puntos medios
    setPuntosMedios(puntos);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Gráfico Combinado (N*i y Ni)</h3>
      <LineChart
        xAxis={[
          {
            id: 'categories',
            data: puntosMedios, // Puntos medios como eje X
            label: 'Punto Medio',
            scaleType: 'linear',
          },
        ]}
        series={[
          {
            id: 'niMultiplicado',
            data: niMultiplicado, // N*i (ni acumulado inverso)
            label: 'N*i',
            color: '#007BFF', // Azul para N*i
          },
          {
            id: 'Ni',
            data: Ni, // Frecuencia acumulada
            label: 'Ni',
            color: '#28A745', // Verde para Ni
          },
        ]}
        width={600}
        height={400}
      />
    </div>
  );
};

export default ChartLineC;
