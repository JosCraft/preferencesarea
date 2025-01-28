import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, IOpcion, Ipregunta } from '../../../../interface/interface';

const ChartBarPort = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [opciones, setOpciones] = useState<IOpcion[]>([]);

  const pregunta: Ipregunta = JSON.parse(localStorage.getItem('pregunta') || '{}') as Ipregunta;

  useEffect(() => {
    fetchRespuestas();
    fetchOpciones();
  }, []);

  const fetchRespuestas = async () => {
    const response = await apiService.get(`respuestas/${pregunta?.id || 0}`);
    setRespuestas(response);
  };

  const fetchOpciones = async () => {
    const response = await apiService.get(`opciones/${pregunta?.id || 0}`);
    setOpciones(response);
  };

  // Procesar los datos para contar las frecuencias y calcular los porcentajes
  const procesarDatos = () => {
    let categories: string[] = [];
    let values: number[] = [];
    let porcentajes: number[] = [];

    if (opciones.length > 0) {
      // Si hay opciones definidas, las usamos para contar las respuestas basadas en el id
      const counts = opciones.reduce((acc, opcion) => {
        acc[opcion.id] = respuestas.filter(res => res.id_opcion === opcion.id).length;
        return acc;
      }, {} as Record<number, number>);

      categories = opciones.map(opcion => opcion.texto); // Usamos los textos como etiquetas para las categorías
      values = Object.values(counts); // Usamos los valores asociados al id como las frecuencias
      porcentajes = values.map(value => (value / respuestas.length) * 100);
    } else {
      // Si no hay opciones, usamos las respuestas libres
      const clases = [...new Set(respuestas.map((respuesta) => respuesta.respuesta_libre))];
      const counts = clases.map((clase) => respuestas.filter((respuesta) => respuesta.respuesta_libre === clase).length);

      categories = clases;
      values = counts;
      porcentajes = values.map(value => (value / respuestas.length) * 100);
    }

    return {
      categories,
      values,
      porcentajes,
    };
  };

  const { categories, values, porcentajes } = procesarDatos();

  return (
    <div>
      <BarChart
        yAxis={[
          {
            id: 'barCategories',
            data: categories, // Las categorías son las opciones o respuestas libres
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: values, // Las frecuencias
            label: 'Frecuencia',
            color: '#4CAF50', // Color verde para las barras
          },
        ]}
        width={600}
        height={500}
        showTooltip={true}
        layout="horizontal"
        label={porcentajes.map(p => `${p.toFixed(1)}%`)} // Mostrar porcentaje en las barras
      />
    </div>
  );
};

export default ChartBarPort;
