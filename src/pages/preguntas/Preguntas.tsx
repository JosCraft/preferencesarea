import {useState,useEffect} from 'react'
import { apiService } from '../../services/apiService'
import MainLayout from '../../templates/MainLayout';
import { Pregunta, SelectCategoria } from './components';
interface Pregunta {
    id: number;
    texto: string;
    categoria: string;
}


const Preguntas = () => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [oldPreguntas, setOldPreguntas] = useState<Pregunta[]>([]);

    useEffect(() => {
            apiService.get('preguntas').then((response) => {
                    const data: Pregunta[] = response;
                    setPreguntas(data);
                    setOldPreguntas(data);
                });
    }, []);

    const handleSelectCategoria = (categoria: string) => {
      const preguntas = [...oldPreguntas];
      if (categoria === 'Todos') {
        setPreguntas(preguntas);
        return;
      }
      setPreguntas(
        preguntas.filter((pregunta) => pregunta.categoria === categoria)
      );
    }

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
      <SelectCategoria handleSelectCategoria={handleSelectCategoria} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {preguntas.map((pregunta) => (
          <Pregunta
            key={pregunta.id}
            id={pregunta.id}
            texto={pregunta.texto}
            categoria={pregunta.categoria}
          />
        ))}
      </div>
      </div>
    </MainLayout>
  )
}

export default Preguntas
