import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Barras, Lines, Pies, Histograma, Poligono } from "./graphs";
import {TContinua, TCualitativa, TCuantitativa} from "./table"

const TabsR = ({ categoria }: { categoria: string }) => {
  return (
    <Tabs defaultValue="tablaC" className="w-[95vw] bg-emerald-200 rounded-lg shadow-lg">
      <TabsList className="flex space-x-2 border-b-2 border-emerald-700 p-2 bg-emerald-600 rounded-t-lg">
        {categoria.split(' ')[0] === "Cualitativo" ? (
          <>
            <TabsTrigger value="tablaC" className="text-white  hover:bg-emerald-400 rounded-lg py-2 px-4">
              Tabla
            </TabsTrigger>
            <TabsTrigger value="graficoBarra" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
              Barras
            </TabsTrigger>
            <TabsTrigger value="graficoPie" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
              Circular
            </TabsTrigger>
          </>
        ) : (
          <>
            {categoria.split(' ')[1] === "Continuo" ? (
                <>
                <TabsTrigger value="tablaCn" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
                Tabla
                </TabsTrigger>
                <TabsTrigger value="graficoHistograma" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
                Histograma
                </TabsTrigger>
                <TabsTrigger value="graficoPoligono" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
                Polígono
                </TabsTrigger>
            </>
            ):(
                <>
                <TabsTrigger value="tablaN" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
                Tabla
                </TabsTrigger>
                <TabsTrigger value="graficoLinea" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
                Líneas
                </TabsTrigger>
                <TabsTrigger value="graficoBarra" className="text-white hover:bg-emerald-400 rounded-lg py-2 px-4">
                Barras
                </TabsTrigger>
            </>
            )}
          </>
        )}
      </TabsList>

      {/* Content area with scroll */}
      <div className="h-[75vh] max-h-[75vh] w-[95vw] overflow-y-auto p-4">
        <TabsContent value="tablaC">
          <TCualitativa/>
        </TabsContent>
        <TabsContent value="graficoBarra">
          <Barras />
        </TabsContent>
        <TabsContent value="graficoPie">
          <Pies />
        </TabsContent>
        <TabsContent value="graficoLinea">
          <Lines />
        </TabsContent>
        <TabsContent value="tablaN">
            <TCuantitativa/>
        </TabsContent>
        <TabsContent value="tablaCn">
            <TContinua/>
        </TabsContent>
        <TabsContent value="graficoHistograma">
            <Histograma/>
        </TabsContent>
        <TabsContent value="graficoPoligono">
            <Poligono/>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsR;
