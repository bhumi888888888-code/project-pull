import { ChevronLeft, ChevronRight, ChevronRightIcon, Forward, Star } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/slices/cart.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleWishlist } from '../../store/slices/wishlist.slice';
import { axiosInstance } from '../../services/axios';

const ProductDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {products, loading} = useSelector(state => state.product)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1)

  const product = (products || []).find(p => p._id === id)

  if(!product) return <p>Product route not found</p>


  const handleNext = () => {
    setCurrentIndex((prev) =>  (prev + 1) % product.images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + product.images.length ) % product.images.length)
  }

  const handleAddToCart = (id, quantity) => {
    dispatch(addToCart({id, quantity}))
  }

  const handleWishlist = (id) => {
    dispatch(toggleWishlist(id))
  }

  // const handleBuyNow = async () => {
  //   try {
  //     const res = await axiosInstance.post('/order/create-checkout-session', {
  //       productId: product._id
  //     });

  //     window.location.href = res.data.url
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleBuyNow = async (e) => {
    // e.preventDeafult()

    navigate("/user/checkout", {
      state: {
        product,
        quantity,
     }
   })
  }

  const aboutCompany = [
    {
      title: "Trusted Luxury Brands",
      description: "All products featured on the platform come exclusively from carefully curated, trusted luxury brands, ensuring authenticity, superior craftsmanship, and premium quality in every purchase."
    },
    {
      title: "Limited-Time Exclusivity",
      description: "Each product is available only for a limited period, creating a sense of exclusivity and urgency—once it’s gone, it may not return, making every purchase feel special and rare."
    },
    {
      title: "Curated Elite Collection",
      description: "The platform showcases a handpicked selection of high-end products rather than overwhelming users with options, ensuring a refined shopping experience focused on elegance, uniqueness, and style."
    },
  ]

  const checkoutInfo = [
    {
      text: "Ships from",
      detail: "Amazon",
      textColor: "text-black",
    },
    {
      text: "Sold by",
      detail: "Vrya Officals",
      textColor: "text-blue-500",
    },
    {
      text: "Payment",
      detail: "Secure transaction",
      textColor: "text-blue-500",
    },
    {
      text: "Gift options",
      detail: "Avaliable at checkout",
      textColor: "text-blue-500",
    },
  ]


  return (
    <div
    className='grid grid-cols-3 gap-6 justify-between bg-primary p-4 pb-12'
    >

      {/* images */}
      <div className='flex  gap-2'>
      <div className='flex flex-col gap-3' >
        {
          (product?.images || []).map((image, index) => (
            <img src={image.url} alt=""  onClick={() => setCurrentIndex(index)} className='size-10 rounded '/>
          ))
        }
      </div>

      <div className='flex '>
        <img src={product?.images?.[0]?.url} alt="" className='max-h-[80vh]' />
        </div>
      </div>

      {/* info */}
      <div className='gap-2'>
        {/* Top div */}
        <div className='space-y-1'>
          <h1 className='text-secondary-dark text-2xl'>{product?.title || "Dyson Hair drier | Purple classic Colour "}</h1>
          <p className='text-xs text-blue-500'>Store {product?.seller.name || "Vrya Offical"}</p>
          {/* Rating */}
          <div className='flex items-center gap-1'>
            <p className='text-sm'>{product?.rating || 5 }</p>
          <div className='flex'>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
            className={`size-3 ${star <=  product?.rating ? "fill-amber-300 text-yellow-400": "text-gray-500"}`}
            />
          ))}
            </div>
          </div>

          {/* <p>{ product?.soldUnits || "2"} sold</p> */}
          <div className='bg-secondary-dark inline-flex p-0.5 rounded text-white'>
          <p className='text-xs'>Limited Edition</p>
          </div>
        </div>

        <hr className='my-4 text-secondary-dark' />

        {/* Bottom div */}
        <div className=''>
        <div>
          <h3 className='text-2xl text-secondary-dark font-semibold'> <sup>$</sup>{product?.price || 599}</h3>
          <p className='text-secondary-light text-xs'>Exclusive of all the taxes</p>
          </div>

          <div className='flex flex-col gap-4 mt-4'>
            {aboutCompany.map(point => (
              <div
                key={point.title}
                className='border border-slate-300 rounded-lg p-4'
              >
                <h3 className="text-secondary-dark text-center font-semibold">{point.title}</h3>
                <p className='text-xs'>{ point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* checkout */}
      <div className='border border-slate-300 rounded-lg p-4  '>
        <div className=' space-y-1'>
          <h4 className='text-2xl text-secondary-dark font-semibold'><sup>$</sup> { product?.price || 599 }</h4>
          <p className='bg-secondary-dark text-white p-0.5 text-xs rounded  inline-flex'>Vrya Offical</p>
          <p className='text-sm text-secondary-dark'>$ 29 Shipping fees</p>
        </div>

        <div className='mt-6'>
          <h4 className={`text-md ${product?.stock > 0 ? "text-green-600" : "text-red-600"} mb-4`}>{product?.stock > 0 ? "In stock" : "Out of Stock "}</h4>

          <div className='space-y-2'>
            {
              checkoutInfo.map((info) => (
                <div
                 key={info.text}
                className='flex items-center gap-6 '>
                  <span className='text-xs text-slate-600'>{ info.text}</span>
                  <span className={`text-sm font-semibold ${info.textColor}`}>{ info.detail}</span>
              </div>
              ))

            }

          </div>


        </div>

        <div className='mt-6 space-y-4'>
          <select
            className='input'
            value={quantity}
            onChange={(e)=> setQuantity(Number(e.target.value))}
          >
            <option value="1">Quantity 1</option>
            <option value="2">Quantity 2</option>
            <option value="3">Quantity 3</option>
            <option value="4">Quantity 4</option>
          </select>

          <button
            className='btn bg-secondary-light rounded-full w-full'
            onClick={() => handleAddToCart(product._id , quantity)}
          >
            Add to cart
          </button>

          <button
            className='btn rounded-full w-full'
            onClick={handleBuyNow}
          >
           Buy Now
          </button>

          <button
            className='btn-outline w-full'
            onClick={()=> handleWishlist(product._id)}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
