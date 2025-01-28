import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, IOpcion, Ipregunta } from '../../../../interface/interface';

const Barras = () => {
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

  // Procesar las respuestas para contar la frecuencia de cada opción o respuesta libre
  const procesarDatos = () => {
    let categories: string[] = [];
    let values: number[] = [];

    if (opciones.length > 0) {
      // Si hay opciones definidas, las usamos para contar las respuestas basadas en el id
      const counts = opciones.reduce((acc, opcion) => {
        acc[opcion.id] = respuestas.filter(res => res.id_opcion === opcion.id).length;
        return acc;
      }, {} as Record<number, number>);

      categories = opciones.map(opcion => opcion.texto); // Usamos los textos como etiquetas para las categorías
      values = Object.values(counts); // Usamos los valores asociados al id como las frecuencias

    } else {
      // Si no hay opciones, usamos las respuestas libres directamente
      const clases = [...new Set(respuestas.map((respuesta) => respuesta.respuesta_libre))]; // Clases únicas de las respuestas
      const counts = clases.map((clase) => respuestas.filter((respuesta) => respuesta.respuesta_libre === clase).length);

      categories = clases;
      values = counts;
    }

    return {
      categories,
      values,
    };
  };

  const { categories, values } = procesarDatos();

  return (
    <div>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: categories, // Las categorías son las opciones o respuestas libres
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: values, // Los valores son las frecuencias de cada opción o respuesta
          },
        ]}
        width={600}
        height={500}
      />
    </div>
  );
};

export default Barras;
