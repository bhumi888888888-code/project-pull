import { CheckCircle } from 'lucide-react'
import React from 'react'

const SuccessPage = () => {
  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='bg-white rounded-lg p-4 border border-slate-300 shadow-sm flex items-center justify-center flex-col  '>
        <CheckCircle  className='mb-2 text-green-500'/>
        <h3 className='text-secondary-dark text-lg'>Payment Successful</h3>

        
      </div>
    </div>
  )
}

export default SuccessPage
