import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
const SelectCategoria = (
    {handleSelectCategoria} : {handleSelectCategoria: (categoria: string) => void}
) => {



  return (
    <Select onValueChange={handleSelectCategoria}>
        <SelectTrigger className="w-[180px] bg-white border border-gray-300 rounded-lg shadow-sm">
            <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Cualitativo Nominal">Cualitativo Nominal</SelectItem>
            <SelectItem value="Cualitativo Ordinal">Cualitativo Ordinal</SelectItem>
            <SelectItem value="Cuantitativo Discreto">Cuantitativo Discreto</SelectItem>
            <SelectItem value="Cuantitativo Continuo">Cuantitativo Continuo</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default SelectCategoria
