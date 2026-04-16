import React from 'react'
import { Link } from 'react-router-dom'

const MostCoveted = () => {
  return (
    <div className=' bg-primary-dark mt-8  '>
      {/* Header */}
      <div className='text-center pt-40 mb-16'>
        <h3 className='text-2xl text-secondary-dark'>Most Coveted</h3>
      </div>

      {/* Content */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-6'>
        <div className='relative w-full'>
       <img src="/men-coveted-1.avif" alt="" className='w-full object-cover md:h-[90vh]' />
          <div className='absolute flex items-center  justify-center inset-0 flex-col  bg-primary-dark h-56 overflow-hidden mx-3.5 top-94.5 p-6 w-102 '>
            <h3 className='text-2xl text-secondary-dark font-semibold mb-4'>The Prefect Trouser</h3>
            <p className='text-secondary-dark text-lg text-center font-light mb-4'>Impeccably tailored for a modern fit. The cornerstone of a versatile wardrobe.</p>
            <Link to={"/men"}
            className='text-secondary-dark hover:cursor-pointer text-lg underline '
            >
              Shop Mensware
            </Link>
        </div>
        </div>

        <div className='relative'>
          <img src="/women-coveted-2.avif" alt="" className='w-full object-cover md:h-[90vh]' />
          <div className='absolute inset-0 flex items-center justify-center bg-primary-dark p-6 text-center h-56 top-107.5 mx-3.5 flex-col w-102'>
            <h3 className='text-secondary-dark text-2xl font-semibold mb-4'>The Statement Dress</h3>
            <p className='text-secondary-dark text-lg font-light mb-4'>A study in modern elegance. Effortlessly transitions from work to evening.</p>
            <Link to={"/women"}
            className='text-secondary-dark underline text-lg hover:cursor-pointer'
            >
            Shop Womensware
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostCoveted
