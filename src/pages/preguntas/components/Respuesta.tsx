import React, { useEffect } from 'react'
import MainLayout from '../../../templates/MainLayout'
import { useAtom } from 'jotai'
import { preguntaAtom } from '../../../context/context'
import { Ipregunta } from '../../../interface/interface'
import  TabsR  from "./TabsR"

const Respuesta = () => {
    const [pregunta] = useAtom(preguntaAtom)
    const [dataPregunta,setDataPregunta] = React.useState<Ipregunta | null>(null)
    useEffect(() => {
        if(pregunta){
            setDataPregunta(pregunta)
        }else{
            const pregunta = localStorage.getItem('pregunta')
            if(pregunta){
                setDataPregunta(JSON.parse(pregunta))
            }
        }
    }, [pregunta])

  return (
    <MainLayout>
      <div className="flex items-center justify-center mt-5" >
        <div className="title">
            <h1 className="text-3xl font-bold">{dataPregunta?.texto}</h1>
            <TabsR categoria={dataPregunta?.categoria || ""} />
        </div>
      </div>
    </MainLayout>
  )
}

export default Respuesta
