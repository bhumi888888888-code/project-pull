import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../store/slices/auth.slice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    dispatch(login(formData));
  };

  return (
    <div className="bg-primary flex items-center justify-center h-screen ">
      <div className="border border-slate-200 shadow-2xl flex-col gap-9 p-10 rounded-lg">
        <div className="w-full mb-6">
          <h1 className="mb-4 text-4xl font-bold text-secondary-dark text-center ">
            Login
          </h1>
          <p className="text-secondary-light text-xs">
            Enter your email and password to login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Email</label>
            <input
              type="email"
              className="border border-slate-500 rounded w-full px-2 py-1 text-sm focus:outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 mb-8">
            <label className="text-xs text-slate-400">Password</label>
            <input
              type="password"
              className="border border-slate-500 rounded w-full px-2 py-1 text-sm focus:outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className="bg-secondary-dark w-full rounded-lg py-2 text-white font-semibold hover:bg-secondary-light shadow-lg disabled:cursor-not-allowed mb-2">
            {loading ? "Login In..." : "Login"}
          </button>
        </form>

        <div className="text-start flex-row gap">
           <span className="text-xs text-secondary-light">Create new account?</span>

          <Link to={"/register"}
          className="text-xs text-secondary-light hover:text-blue-700 hover:underline ml-1"
          >
            Sign in
            </Link>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
