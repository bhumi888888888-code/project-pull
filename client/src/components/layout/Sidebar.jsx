import { LogOut, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideBar } from '../../store/slices/popup.slice';
import { Link } from 'react-router-dom';
import { logout } from '../../store/slices/auth.slice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  const closeSidebar = () => {
  dispatch(toggleSideBar())
  }



  return (

    <div className='bg-white/50 fixed inset-0 h-full w-64 z-50 p-4 shadow-lg backdrop-blur-md flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold '>Seller</h2>
        <button onClick={closeSidebar}>
        <X className='border rounded border-slate-400 shadow-lg hover:text-black text-slate-600' />
        </button>
      </div>

      <ul>
        <li
          className='font-semibold border px-2 py-2 rounded-lg border-transparent hover:bg-slate-200 text-slate-700 text-lg'
        onClick={closeSidebar}
        >
          <Link to={'/seller/manage-products'} >
          Manage Products
          </Link>
        </li>
        <li
          className='font-semibold border px-2 py-2 rounded-lg border-transparent hover:bg-slate-200 text-slate-700 text-lg'
           onClick={closeSidebar}
        >
          <Link to={'/seller/manage-inventory'}>
          Manage Inventory
          </Link>
        </li>
        <li
          className='font-semibold border px-2 py-2 rounded-lg border-transparent hover:bg-slate-200 text-slate-700 text-lg'
         onClick={closeSidebar}
        >
          <Link to={'/seller/manage-orders'}>
            Manage Orders
          </Link>
        </li>
        <li
          className='font-semibold border px-2 py-2 rounded-lg border-transparent hover:bg-slate-200 text-slate-700 text-lg'
         onClick={closeSidebar}
        >
          <Link to={'/seller'}>
          Orders Table
          </Link>
        </li>
      </ul>

      <div className="flex mt-auto items-center justify-center">
        <button
          className="flex btn w-full items-center justify-center gap-1"
          onClick={handleLogout}
        >
        Logout
          <LogOut />
      </button>
      </div>
    </div>
  )
}

export default Sidebar
