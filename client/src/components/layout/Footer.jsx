import React from 'react'

const Footer = () => {

  // const shop = [
  //   {
  //     title: "All Pord",
  //   }
  // ]

  return (
    <div className='bg-primary px-10 pb-6'>

      <div>
      <div className='pt-10'>
        <h3 className='text-secondary-dark text-xl mb-4'>Join the List</h3>
        <p className='text-secondary-dark text-sm mb-4'>Early access, private sales, and the latest from our studio, straight to your inbox.</p>
      </div>

      <form >
      <div className='flex flex-col'>
        <label className='text-xs text-secondary-dark'>Email address <sup>*</sup></label>
        <input
          type="email"
          className='border-b text-secondary-dark focus:outline-none'
        />
      </div>

      <div className='flex mt-2 gap-2'>
        <input
          type="checkbox"
          required
          className='inline-flex '
        />
        <p className='text-secondary-dark text-xs'>Yes, agree to receive marketing emails <sup>*</sup></p>
        </div>

        <div className='mt-4'>
          <button
          className='border min-w-[16vw] text-secondary-dark p-2'
          >
            Join Now
          </button>
        </div>
        </form>
      </div>

      <div className='grid grid-cols-3 mt-18'>

        <div className='text-secondary-dark '>
          <h3 className='mb-8 text-lg font-semibold'>Shop</h3>
          <ul className='space-y-1'>
            {/* navigate  */}
            <li>All Products</li>
            <li>Books</li>
            <li>Fashion</li>
            <li>Electorincs</li>
          </ul>
        </div>

        <div className='text-secondary-dark '>
          <h3 className='mb-8 text-lg font-semibold' >Help</h3>
          <ul className='space-y-1'>
            {/* navigate  */}
            <li>Contect Us</li>
            <li>Shipping & Return</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className='text-secondary-dark '>
          <h3 className='mb-8 text-lg font-semibold' >Legal</h3>
          <ul className='space-y-1'>
            {/* navigate  */}
            <li>Terms & Conditons</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Accessibilty Statement</li>
          </ul>
        </div>

      </div>

      <div className='mt-20 text-center'>
        <h2 className='text-secondary-dark text-8xl'>Vrya</h2>
        <p className='text-secondary-dark mt-2 text-sm'>&copy; 2026 by Vrya. Powered and Secured by Tempest</p>
      </div>


    </div>
  )
}

export default Footer
