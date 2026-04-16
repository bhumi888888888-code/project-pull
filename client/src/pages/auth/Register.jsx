import React, { useEffect, useState } from 'react'
import { register } from '../../store/slices/auth.slice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {


    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  const { authUser, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.role === "Admin") navigate("/admin");
    else if (authUser?.role === "Seller") navigate("/seller");
    else if (authUser?.role === "User") navigate("/user");
  }, [authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const handleRole = (e) => {
    setFormData(prev => ({
      ...prev,
      role: e.target.value
    }))
  }
 return (
    <div className="bg-primary flex items-center justify-center h-screen ">
      <div className="border border-slate-200 shadow-2xl flex-col gap-9 p-10 rounded-lg md:w-[44vw]">
        <div className="w-full mb-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-secondary-dark text-center ">
            Register
          </h1>
          <p className="text-secondary-light text-xs">
            Create an new account
          </p>
        </div>

       <form onSubmit={handleSubmit} className="space-y-4 w-full ">

         <div className='space-y-4 flex flex-col md:flex-row w-full md:gap-6'>
         <div className='flex flex-col gap-1 flex-1 '>
           <label className='text-xs text-slate-400'>Name</label>
           <input
             type="text"
             className='border rounded px-2 border-slate-500 py-1 w-full text-sm focus:outline-none flex-1 '
             required
             value={formData.name}
             onChange={(e) =>
               setFormData({ ...formData, name: e.target.value })
             }
           />
           </div>

           <div className='flex flex-col gap-1'>
             <label className='text-xs text-slate-400' >Role</label>
             <select
               className="border border-slate-500 rounded  text-sm text-slate-600 px-2 w-full py-1"
               value={formData.role || ""}
               onChange={handleRole}
             >
              <option value="">Select Role</option>
              <option value="User">Customer</option>
              <option value="Seller">Seller</option>
             </select>
           </div>
         </div>


         <div className='space-y-4 flex md:gap-6 w-full md:flex-row flex-col'>
          <div className="flex flex-col gap-1 flex-2">
            <label className="text-xs text-slate-400">Email</label>
            <input
              type="email"
              className="border border-slate-500 rounded w-full px-2 py-1 text-sm focus:outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
             required
            />
          </div>
          <div className="flex flex-col gap-1 mb-8 flex-2">
            <label className="text-xs text-slate-400">Password</label>
            <input
              type="password"
              className="border border-slate-500 rounded w-full px-2 py-1 text-sm focus:outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
             required
            />
          </div>
         </div>

          <button
            disabled={loading}
            className="bg-secondary-dark w-full rounded-lg py-2 text-white font-semibold hover:bg-secondary-light shadow-lg disabled:cursor-not-allowed mb-2">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-start flex-row gap">
           <span className="text-xs text-secondary-light">Already have an account?</span>

          <Link to={"/login"}
          className="text-xs text-secondary-light hover:text-blue-700 hover:underline ml-1"
          >
            Sign up
            </Link>

        </div>
      </div>
    </div>
  );
}

export default Register
