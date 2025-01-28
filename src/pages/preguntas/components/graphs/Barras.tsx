
import { useEffect, useState } from 'react';

import { ChartBar, ChartBarPort} from "../charts"

const Barras = () => {




  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='mr-2'>
      <ChartBar/> 
      </div>
      <div className='ml-2'>
      <ChartBarPort/>
      </div>

    </div>
  )
}

export default Barras
