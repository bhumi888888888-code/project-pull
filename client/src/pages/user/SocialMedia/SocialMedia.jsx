import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SocialMediaSidebar from '../../../components/layout/SocialMediaSidebar';
import { getPosts } from '../../../store/slices/post.slice';
import { Bookmark, EllipsisIcon, EllipsisVertical, GripVertical, Heart, Menu, MessageCircle, Save, Send, Share, Tag } from 'lucide-react';

const SocialMedia = () => {

  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPosts())
  },[])

  useEffect(() => {
  console.log(posts)
  },[posts])

  return (
    <div className='flex flex-col md:flex-row gap-8'>

          {/* SIDEBAR */}
      <div className='sm:w-60'>
        <SocialMediaSidebar />
      </div>

      {/* CONTENT */}
      <div className='flex '>

        {
          posts && posts.length > 0 ? (
            posts.map(post => (
              <div
              key={post._id}
              className=''
              >

                {/*  User Header */}
                <div className='bg-black/80 p-2 text-white flex items-center justify-between mb-2 px-3' >
                  <div className='flex gap-2 '>
                  <img
                    src={post?.user?.profilePic || 'https://via.placeholder.com/40'} alt="User profile"
                    className='size-8 rounded-full object-cover shadow-lg'
                  />

                  <div>
                    <span>{post.user?.name || "Anonymous"}</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button
                    className='rounded-lg font-semibold text-white bg-slate-600 py-1 px-4'
                    >
                      Follow
                    </button>
                    <EllipsisVertical className='size-6' />
                  </div>
                </div>

                {post && post.videos.length > 0 ? (
                  < video
                    src={post.videos[0].url}
                    className='h-[80vh]'
                  />
                ) : (
                <div>No vidoes found</div>
                )}

                <div className='bg-black/90  p-1 pb-4'>
                <div
                className='flex items-center justify-between'
                >
                  <div className='flex gap-3 text-white'>
                    <div className='flex gap-0.5 '>
                      <Heart />
                      <p>{ post.likes}</p>
                    </div>
                    <div className='flex gap-0.5'>
                    <MessageCircle />
                      <p>{ post.commentCount}</p>
                    </div>
                    <Send />
                  </div>

                    <button className='text-white'>
                      <Bookmark className='size-6' />
                    </button>

                  </div>
                  <div>
                    {post && post.likes.length > 0 && (
                      <div>
                        <p>Liked by <span className='font-semibold'>{ post.likes[0].user.name}</span> and others</p>
                      </div>
                    )}
                  </div>

                  <div className='text-white'>
                  <div className='mt-1 flex gap-1.5 mb-1'>
                    <h3 className='font-semibold text-sm'>{ post.user.name}</h3>
                    <p className='font-light text-sm'>{ (post.text).slice(0,35)}</p>
                    </div>
                    <p className='text-xs text-slate-500'>{ (post.createdAt).split("T")[0]}</p>
                  </div>
               </div>
              </div>
            ))
          ): (
            <p>No post found</p>
          )
        }
      </div>


    </div>
  )
}

export default SocialMedia
      // <div className='flex-1'>
      //   {posts && posts.length > 0 ? (
      //     posts.map((post) => (
      //       <div className='mb-6 p-4 border rounded-lg' key={post._id}>
      //         <p className="mb-2">{post.text}</p>

      //         {/* FIX: Added the '?' and fixed the spelling to 'videos' */}
      //         {post.videos && post.videos.length > 0 ? (
      //           <video
      //             src={post.videos[0].url}
      //             controls
      //             className='w-full max-w-lg rounded-md'
      //           />
      //         ) : (
      //           <div className="text-gray-400 italic">
      //             No videos attached
      //           </div>
      //         )}
      //       </div>
      //     ))
      //   ) : (
      //     <p>No posts found.</p>
      //   )}
      // </div>
