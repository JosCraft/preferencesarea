import { useAtom } from "jotai";
import { preguntaAtom } from "@/context/context";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Usando un botón estilizado de tu librería

interface PreguntaProps {
  id: number;
  texto: string;
  categoria: string;
}

const Pregunta = ({ id, texto, categoria }: PreguntaProps) => {

    const [, setPregunta] = useAtom(preguntaAtom);

    const handleRevisar = () => {        
        setPregunta({ id, texto, categoria });
        localStorage.setItem('pregunta', JSON.stringify({ id, texto, categoria }));
        window.location.href = "/respuesta";
    }

  return (
    <Card className=" shadow-lg border rounded-2xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white p-4 rounded-t-2xl">
        <CardTitle className="text-xl font-bold">{texto}</CardTitle>
      </CardHeader>
      <CardFooter className="p-4 flex justify-end">
        <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2" onClick={handleRevisar}>
          Revisar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Pregunta;
