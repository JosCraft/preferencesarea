import {useState,useEffect} from 'react'
import { apiService } from '../../services/apiService'
import MainLayout from '../../templates/MainLayout';

interface Pregunta {
    id: number;
    texto: string;
    categoria: string;
}


const Preguntas = () => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);

    useEffect(() => {
            apiService.get('preguntas').then((response) => {
                    const data: Pregunta[] = response;
                    setPreguntas(data);
                });
    }, []);

  return (
    <MainLayout>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id}>
            <h2>{pregunta.texto}</h2>
            <p>{pregunta.categoria}</p>
        </div>
        ))}

    </MainLayout>
  )
}

export default Preguntas
