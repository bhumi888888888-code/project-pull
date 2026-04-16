import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../store/slices/cart.slice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) return <p>Loading cart...</p>;

  // ✅ Map over the items array inside the cart object
  const cartItems = cart?.items || [];

  return (
    <div className='p-6'>
      <h2 className="text-2xl font-bold mb-4">Your Cart ({cartItems.length})</h2>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="mt-4 p-6 rounded-lg relative border flex flex-col gap-2" key={item._id}>
            <div className="flex gap-4">
              <div className="size-16 bg-slate-100 rounded overflow-hidden">
                <img
                  src={item.product?.images?.[0]?.url || "/placeholder.png"}
                  alt={item.product?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.product?.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{item.product?.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs border px-2 py-1 rounded">Quantity: {item.quantity}</p>
              <p className="text-sm font-bold text-blue-600">
                ${(item.product?.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-slate-500 mt-10">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage
