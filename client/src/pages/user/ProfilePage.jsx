import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {User, X} from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../store/slices/order.slice'
import { editProfile } from '../../store/slices/auth.slice'

const ProfilePage = () => {

  const { authUser } = useSelector(state => state.auth)
  const {orders} = useSelector(state => state.order)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    profilePic: null,
  })
  const [editProfileOpen, setEditProfileOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.profilePic) data.append("profilePic", formData.profilePic)
    dispatch(editProfile(data))
    setEditProfileOpen(false);
  }

  const closeModel = () => {
    setEditProfileOpen(false);
    setFormData({
      name: authUser?.name ||  "",
      profilePic: null,
    })
  }

  useEffect(() => {
  dispatch(getOrders())
  }, [])

  console.log("order", orders)

  return (
    <div className='bg-white/50 p-6 min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 '>
        <div className=' border border-slate-300 shadow-xl rounded-lg p-6 items-center flex flex-col md:col-span-2  md:row-span-3 '>
          <div className='flex items-center justify-center gap-4 '>
            <img src={authUser?.profilePic || "/userIcon.png"} alt="" className='size-16 rounded-full shadow flex items-center justify-center object-cover' />

          <div className='flex flex-col ml-8 gap-1 '>
            <p className='text-sm text-secondary-dark '>
            <span >name: </span>
            <span>{ authUser?.name}</span>
            </p>
            <p className='text-sm text-secondary-dark'>
            <span>email: </span>
            <span>{ authUser?.email}</span>
            </p>
          </div>
          </div>

          <div className='bg-blue-100 border-blue-300 flex items-center justify-between p-4 rounded-lg shadow-lg w-full mt-8 '>
            <div className='text-center'>
              <p className='text-blue-500 font-semibold text-md'>Followers: </p>
              <p className='text-2xl font-semibold text-blue-500'>{authUser.followers | 0 }</p>
            </div>
            <div className='text-center'>
              <p className='text-blue-500 font-semibold text-md'>Following: </p>
              <p className='text-2xl font-semibold text-blue-500'>{authUser.following | 0 }</p>
            </div>
            <div className='text-center'>
              <p className='text-blue-500 font-semibold text-md'>Posts: </p>
              <p className='text-2xl font-semibold text-blue-500'>{authUser.posts | 0 }</p>
            </div>
          </div>
        </div>

          <div className='bg-blue-100 border-blue-300 flex items-center justify-between p-4 rounded-lg shadow-lg w-full mt-8 '>
            <div className='text-center'>
              <p className='text-blue-500 font-semibold text-md'>Orders: </p>
              <p className='text-2xl font-semibold text-blue-500'>{orders.length | 0 }</p>
            </div>
            <div className='text-center'>
              <p className='text-blue-500 font-semibold text-md'>Following: </p>
              <p className='text-2xl font-semibold text-blue-500'>{authUser.following | 0 }</p>
            </div>
            <div className='text-center'>
              <p className='text-blue-500 font-semibold text-md'>Posts: </p>
              <p className='text-2xl font-semibold text-blue-500'>{authUser.posts | 0 }</p>
            </div>
          </div>

      </div>

      <div className='mt-6 space-y-6 md:mt-12'>
        <div className='bg-blue-500 text-center py-3 rounded-lg shadow-xl '>
          <button
            onClick={()=> navigate("/user/orders")}
            className='text-primary font-bold text-lg'>
            Orders
          </button>
        </div>
        <div className='bg-yellow-100/50 border  border-yellow-300 text-center py-3 rounded-lg shadow-xl'
         onClick={()=> navigate("/notification")}
        >
          <button
            className='text-yellow-500 text-lg font-semibold'

          >
            Notifications
          </button>
        </div>
        <div className='bg-pink-100/50 border border-pink-300 text-center py-3 rounded-lg shadow-xl'>
          <button
          onClick={()=> setEditProfileOpen(!editProfileOpen)}
          className='text-pink-500 text-lg font-semibold'
          >Edit Profile</button>
        </div>
      </div>


      {/* Edit profile open */}
      {
        authUser && editProfileOpen && (
          <div className='fixed inset-0 items-center justify-center bg-black/50 z-50 p-6'>
            <div className='bg-white rounded-lg p-4'>
              {/* Header */}
              <div className='mb-4 flex items-center justify-between'>
                <h3 className="text-center font-semibold text-2xl" >Edit Profile</h3>
                <X />
              </div>

              <hr />

              <form className="mt-4 space-y-4 mb-4"
              onSubmit={handleSubmit}
              >
                <div>
                  <label className='text-sm text-slate-400' >Name</label>
                  <input
                    type="text"
                    className='input'
                  value={formData.name}
                  onChange={(e)=> setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div
                className='flex'
                >
                  <label className='text-sm text-slate-400 border border-dashed  flex-1 h-25 flex items-center justify-center '  >Profile Picture
                  <input
                  type="file"
                  className='hidden'
                  // value={formData.profilePic}
                  onChange={(e)=> setFormData({...formData, profilePic: e.target.files[0]})}
                    />
                  </label>
                </div>

                <div className='flex items-center justify-end gap-2'>
                  <button
                    type="button"
                    className='btn'
                    onClick={closeModel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                  className='btn bg-blue-500'
                  >
                    Edit
                  </button>
                </div>
              </form>

            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProfilePage
