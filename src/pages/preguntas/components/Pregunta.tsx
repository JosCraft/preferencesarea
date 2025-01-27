import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface PreguntaProps {
    id: number;
    texto: string;
    categoria: string;
}

const Pregunta = (
    {id, texto, categoria}: PreguntaProps
) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{texto}</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription>{categoria}</CardDescription>
        </CardContent>
        <CardFooter>
            <button className="btn">Responder</button>
        </CardFooter>
    </Card>
  )
}

export default Pregunta
