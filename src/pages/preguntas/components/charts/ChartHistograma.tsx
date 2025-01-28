import { useEffect, useState } from 'react';
import { apiService } from '../../../../services/apiService';
import { Irespuesta, Ipregunta } from "../../../../interface/interface";
import { BarChart } from '@mui/x-charts';

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

const ChartHistograma = () => {
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

      const fi = ni.map((n) => (n / respuestas.length).toFixed(3));
      const fiPorcentaje = fi.map((f) => (parseFloat(f) * 100).toFixed(3));

      const niMultiplicado = ni.reverse().reduce((acc, current, index) => {
        const sum = acc[acc.length - 1] ? acc[acc.length - 1] + current : current;
        acc.push(sum);
        return acc;
      }, []).reverse();

      const Fi = fi.reduce((acc, current, index) => {
        const total = index === 0 ? parseFloat(current) : parseFloat((parseFloat(current) + acc[index - 1]).toFixed(3));
        acc.push(total);
        return acc;
      }, []);

      const FiMultiplicado = fi.map((f, index) => (parseFloat(f) * Ni[index]).toFixed(3));

      return { ni, Ni, niMultiplicado, fi, Fi, FiMultiplicado, fiPorcentaje };
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

    const { ni, Ni, niMultiplicado, fi, Fi, FiMultiplicado, fiPorcentaje } = procesarRespuestas(clases, respuestas);

    const processedData = clases.map((clase, index) => ({
      opcion: clase.opcion,
      marca: clase.marca,
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

  useEffect(() => {
    if (respuestas.length > 0) {
      procesarDatos();
    }
  }, [respuestas]);

  // Aquí definimos las categorías y valores que se pasan al gráfico
  const categories = datosProcesados.map((data) => data.opcion); // Las categorías son las opciones de respuesta
  const values = datosProcesados.map((data) => data.ni); // Los valores son las frecuencias de cada opción

  return (
    <div>
      <h2>Histograma</h2>
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
        xField="label"
        yField="value"
        seriesField="label"
        width={800}
        height={600}
      />
    </div>
  );
};

export default ChartHistograma;
