import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SocialMediaSidebar from '../../../components/layout/SocialMediaSidebar';

const SocialMedia = () => {

  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.post)

  useEffect(()=>{},[])

  return (
    <div className='flex flex-col md:flex-row gap-8'>

          {/* SIDEBAR */}
      <div className='sm:w-60'>
        <SocialMediaSidebar />
      </div>

      {/* CONTENT */}
      <div className=''>hey</div>



    </div>
  )
}

export default SocialMedia
