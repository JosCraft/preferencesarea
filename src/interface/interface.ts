export interface Ipregunta  {
    id: number;
    texto: string;
    categoria: string;
}
export interface Irespuesta  {
    id: number;
    id_encuesta: number;
    id_pregunta: number;
    id_opcion: number;
    respuesta_libre: string;
}

export interface IOpcion  {
    id: number;
    id_pregunta: number;
    texto: string;
    codigo: string;
}