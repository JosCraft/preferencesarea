import { useState, useEffect } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import { apiService } from "../../../../services/apiService";
import { Irespuesta, IOpcion, Ipregunta } from "../../../../interface/interface";

const ChartPie = () => {
  const [respuestas, setRespuestas] = useState<Irespuesta[]>([]);
  const [opciones, setOpciones] = useState<IOpcion[]>([]);
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const pregunta: Ipregunta = JSON.parse(localStorage.getItem("pregunta") || "{}") as Ipregunta;

  useEffect(() => {
    fetchRespuestas();
    fetchOpciones();
  }, []);

  useEffect(() => {
    if (respuestas.length > 0 && opciones.length > 0) {
      procesarDatos();
    }
  }, [respuestas, opciones]);

  const fetchRespuestas = async () => {
    const response = await apiService.get(`respuestas/${pregunta?.id || 0}`);
    setRespuestas(response);
  };

  const fetchOpciones = async () => {
    const response = await apiService.get(`opciones/${pregunta?.id || 0}`);
    setOpciones(response);
  };

  const procesarDatos = () => {
    const counts = opciones.reduce((acc, opcion) => {
      acc[opcion.id] = respuestas.filter((res) => res.id_opcion === opcion.id).length;
      return acc;
    }, {} as Record<number, number>);

    const formattedData = opciones.map((opcion) => ({
      name: opcion.texto,
      value: counts[opcion.id] || 0,
    }));

    setData(formattedData);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PieChart
        series={[
          {
            data, // Asegúrate de que los datos estén en el formato correcto
            arcLabel: (item) => `${item.value}%`, // Etiqueta personalizada
            arcLabelMinAngle: 35, // Ángulo mínimo para mostrar las etiquetas
            arcLabelRadius: '60%', // Ajusta el radio de las etiquetas
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold', // Estilo de las etiquetas
          },
        }}
        {...{ width: 600, height: 600 }} // Puedes ajustar el tamaño como lo necesites
      />
    </div>
  );
};

export default ChartPie;
