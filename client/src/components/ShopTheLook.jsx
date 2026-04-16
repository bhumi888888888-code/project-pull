import React, { useState } from 'react'

const ShopTheLook = () => {

  const [quickViewOpen, setQuickViewOpen] = useState(false)
  return (
    <div className='bg-primary pt-4 justify-center items-center flex px-2 '>
      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-8 md:gap-8'>
        <div className='relative md:col-span-2 md:row-span-4 md:ml-4'>
          <img src="/shop_the_look_1.avif" alt="" className='h-full w-full object-cover'/>
          <div className='absolute inset-0 justify-center top-8 left-8 md:top-20 md:left-20'>
            <p className='text-white text-3xl md:text-4xl'>Shop The Look</p>
          </div>
        </div>

        <div className=''>
            <img src="/shop_the_look_2.avif" alt="" className='' />
            <div className='flex items-center justify-between mt-4 text-secondary-dark overflow-x-hidden '>
              <p>Relaxed Straight trouser</p>
              <p>$78.00</p>
            </div>
        </div>

          <div >
            <img src="/shop_the_look_3.avif" alt="" />
            <div className='flex items-center justify-between mt-4 text-secondary-dark '>
              <p>Classic Cotton Baby Tee</p>
              <p>$35.00</p>
            </div>
        </div>


          <div >
            <img src="/shop_the_look_4.avif" alt="" />
            <div className='flex items-center justify-between mt-4 text-secondary-dark '>
              <p>Classic Trench Coat</p>
              <p>$260.00</p>
            </div>
        </div>


          <div >
            <img src="/shop_the_look_5.avif" alt="" />
            <div className='flex items-center justify-between mt-4 text-secondary-dark '>
              <p>Ribbed Wool Socks</p>
              <p>$30.00</p>
            </div>
        </div>


      </div>
    </div>
  )
}

export default ShopTheLook
