import React from 'react'
import {ChartLineMy, ChartLineMn, ChartLineC} from '../charts'
const Lines = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-row items-center justify-center' >
        <div className='mr-2'>
        <ChartLineMy />
        </div>
        <div className=''>
        <ChartLineMn />
        </div>
      </div>
      <div>
      <ChartLineC />
      </div>
    </div>
  )
}

export default Lines
