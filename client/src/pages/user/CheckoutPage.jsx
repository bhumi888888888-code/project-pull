import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/axios';

const CheckoutPage = () => {

  const location = useLocation();
  const checkoutData = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product, quantity } = checkoutData;
  const {authUser} =  useSelector(state => state.auth)

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
  })

  const handlePayment = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post(
      "/payment/create-checkout-session", {
        productId: product._id,
        quantity,
        address,
      }
    )
    window.location.href = res.data.url; //redirect to stripe
  }
  // console.log("AuthUser:", authUser);
  console.log("Checkout Page rendered");
  console.log("location state:", location.state);

  if (!checkoutData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Loading checkout...</p>
      </div>
    )
  }

  return (
    <div
    className='bg-primary p-8 '
    >
      <h2 className='text-center text-2xl font-semibold md:text-4xl text-secondary-dark mb-8'>Checkout</h2>

      {/* Form */}
      <div className=' flex  justify-center '>
        <form className='space-y-2 '
        onSubmit={handlePayment}
        >
        <div >
        <label className='text-xs text-slate-500' >Full Name</label>
        <input
          type="text"
          className='input'
          value={address.fullName}
          onChange={(e) => setAddress({...address, fullName: e.target.value})}
        />
        </div>

        <div>
        <label className='text-xs text-slate-500'>Phone</label>
        <input
          type="number"
          className='input'
          value={address.phone}
          onChange={(e) => setAddress({...address, phone: e.target.value})}
        />
        </div>

        <div>
        <label  className='text-xs text-slate-500'>Address</label>
        <input
          type="text"
          className='input'
          value={address.addressLine1}
          onChange={(e) => setAddress({...address, addressLine1: e.target.value})}
        />
      </div>

        <div>
        <label className='text-xs text-slate-500' >City</label>
        <input
          type="text"
          className='input'
          value={address.city}
          onChange={(e) => setAddress({...address, city: e.target.value})}
        />
      </div>

          <div className='flex flex-col md:flex-row gap-2 '>

        <div>
        <label className='text-xs text-slate-500' >State</label>
        <input
          type="text"
          className='input'
          value={address.state}
          onChange={(e) => setAddress({...address, state: e.target.value})}
        />
      </div>

        <div>
        <label className='text-xs text-slate-500' >Postal Code</label>
        <input
          type="text"
          className='input'
          value={address.postalCode}
          onChange={(e) => setAddress({...address, postalCode: e.target.value})}
        />
            </div>
          </div>

        <div className='mt-8 flex items-center justify-end gap-2'>
          <button
          type='button'
              className='btn-danger'
              onClick={() =>  navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className='btn'
          >Proceed to Payment</button>
        </div>
        </form>
      </div>

    </div>
  )
}

export default CheckoutPage
