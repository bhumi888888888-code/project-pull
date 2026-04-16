import {
  Compass,
  File,
  Heart,
  Home,
  Plane,
  PlaneIcon,
  Plus,
  Search,
  Send,
  User,
  Video,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCreatePost } from "../../store/slices/popup.slice";
import { createPost } from "../../store/slices/post.slice";
import { toast } from "react-toastify";

const SocialMediaSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { isCreatePostOpen } = useSelector((state) => state.popup);
  const [formData, setFormData] = useState({
    text: "",
    images: "",
    videos: "",
  });
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.text || !formData.videos) {
      return alert("Video and description are required for creating a post");
    }

    setLoading(true);
    const res = await dispatch(createPost(formData));

    if (createPost.fulfilled.match(res)) {
      toast.success("Post created successfully");
      setFormData({ text: "", images: "", videos: "" });
      dispatch(toggleCreatePost());
    } else {
      toast.error("Error: " + res?.payload?.message);
    }

    setLoading(false);
  };

  //users name or email or text
  //post textincudes

  return (
    <div className=" flex flex-row sm:flex-col gap-4 bg-primary shadow-sm p-2">
      <h3 className="hidden sm:block text-2xl font-semibold mb-16 p-2 ">
        Vrya
      </h3>

      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg"
          onClick={() => navigate("/social-media-home-page")}
        >
          <Home className="size-6" />
          <p className="text-md font-semibold ">Home</p>
        </div>

        <div className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg">
          <Video className="" />
          <p className="text-md font-semibold">Reels</p>
        </div>

        <div className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg">
          <Send className="" />
          <p className="text-md font-semibold">Message</p>
        </div>

        <div className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg">
          <Search className="" />
          <p className="text-md font-semibold">Search</p>
        </div>

        <div className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg">
          <Compass className="" />
          <p className="text-md font-semibold">Explore</p>
        </div>

        <div className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg">
          <Heart className="" />
          <p className="text-md font-semibold">Notifications</p>
        </div>

        <div
          className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg hover:cursor-pointer"
          onClick={() => dispatch(toggleCreatePost())}
        >
          <Plus className="" />
          <p className="text-md font-semibold">Create</p>
          {/* <label className='flex items-center gap-4' >
          <Plus className='' />
            <p className='text-md font-semibold'>Create</p>
            <input
              type="file"
              className='hidden'
              value={formData.videos}
              onChange={(e)=> setFormData({...formData, videos: e.target.files[0]})}
            />
          </label> */}
        </div>

        <div className="flex items-center gap-4 hover:bg-primary-dark p-2 rounded-lg">
          <User className="" />
          <p className="text-md font-semibold">Profile</p>
        </div>

        {isCreatePostOpen && (
          <div className="fixed bg-black/50 inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold">Upload</h3>
                <X
                  className="border border-slate-400 rounded-lg shadow-sm hover:bg-slate-200 hover:cursor-pointer"
                  onClick={() => dispatch(toggleCreatePost())}
                />
              </div>

              <hr className="mb-6" />

              <form className="space-x-6" onSubmit={HandleSubmit}>
                <div className="w-full flex">
                  <label className="border border-dashed rounded-lg w-full flex flex-col items-center justify-center h-36">
                    <File />
                    Upload videos from computer
                    <input
                      type="file"
                      className="hidden"
                      // value={formData.videos}
                      onChange={(e) =>
                        setFormData({ ...formData, videos: e.target.files[0] })
                      }
                      accept="video/*"
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-500">
                    Description
                  </label>
                  <textarea
                    className="input"
                    // rows={}
                    value={formData.text}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    className="btn-danger"
                    type="button"
                    onClick={() => dispatch(toggleCreatePost())}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaSidebar;
