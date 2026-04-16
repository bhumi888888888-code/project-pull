import React, { useState } from "react";
import {
  ArrowBigDown,
  ArrowUp,
  BadgeDollarSign,
  CarTaxiFront,
  DollarSign,
  Menu,
  ShoppingCart,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../store/slices/popup.slice";
import Sidebar from "../../components/layout/Sidebar";

// const stats = [
//   {
//     title: "Total Orders",
//     icon: <CarTaxiFront />,
//     // value:
//   }
// ]

const SellerDashboard = () => {
  const { isSidebarOpen } = useSelector((state) => state.popup);

  const { authUser, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(toggleSideBar());
  };

  const categoryTag = (category) => {
    switch (category) {
      case "Menware":
        return "flex bg-blue-200 text-blue-500 border border-blue-300 px-1 py-0.5 rounded-full";
        break;
      case "Fashion":
        return " flex bg-pink-200 text-pink-500 border border-pink-300 px-1 py-0.5 rounded-full";
        break;
      case "Books":
        return "flex bg-purple-200 text-purple-500 border border-purple-300 px-1 py-0.5 rounded-full";
        break;
      case "Home":
        return "flex bg-brown-200 text-brown-500 border border-brown-300 px-1 py-0.5 rounded-full";
        break;
      case "Other":
        return "flex bg-teal-200 text-teal-500 border border-teal-300 px-1 py-0.5 rounded-full";
        break;

      default:
        return "flex bg-gray-200 text-gray-500 border border-gray-300 px-1 py-0.5 rounded-full";
        break;
    }
  };

  return (
    <div className="bg-primary-dark min-h-screen p-6">
      {/* Header */}
      <nav className="flex gap-3 items-center">
        <div className="inline cursor-pointer" onClick={toggleSidebar}>
          <Menu />
        </div>
        <h1 className="text-2xl font-bold">Vrya</h1>
      </nav>

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="bg-white/50 rounded-lg shadow-2xs p-6 m-4">
          <div className="flex  items-center gap-3 mb-8">
            <span className="inline-flex shadow-lg bg-slate-100 border-slate-200 px-2 py-1 rounded ">
              <ShoppingCart className="size-6" />
            </span>
            <p className="text-lg font-semibold">Total Orders</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">500</h3>
              <div className="flex gap-1">
                <TrendingUp className="text-green-300" />
                <p className="text-sm">
                  {" "}
                  <span className="text-green-500">10%</span> vs last month
                </p>
              </div>
            </div>
            <TrendingUp className="text-green-400" size={80} width={99} />
          </div>
        </div>

        <div className="bg-white/50 rounded-lg shadow-2xs p-6 m-4">
          <div className="flex  items-center gap-3 mb-8">
            <span className="inline-flex shadow-lg bg-slate-100 border-slate-200 px-2 py-1 rounded ">
              <DollarSign className="size-6" />
            </span>
            <p className="text-lg font-semibold">Total Sell</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold"> $ 500</h3>
              <div className="flex gap-1">
                <TrendingDown className="text-red-300" />
                <p className="text-sm">
                  {" "}
                  <span className="text-red-500">10%</span> vs last month
                </p>
              </div>
            </div>
            <TrendingDown className="text-red-400" size={80} width={99} />
          </div>
        </div>

        <div className="bg-white/50 rounded-lg shadow-2xs p-6 m-4">
          <div className="flex  items-center gap-3 mb-8">
            <span className="inline-flex shadow-lg bg-slate-100 border-slate-200 px-2 py-1 rounded ">
              <Tag className="size-6" />
            </span>
            <p className="text-lg font-semibold">Total Products</p>
          </div>
          <div className="">
            <h3 className="text-2xl font-bold">70</h3>
            <div className="flex gap-1">
              <ArrowUp className="text-green-300" />
              <p className="text-sm">
                <span className="text-green-500">+10</span> vs last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Half */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="bg-white/50 rounded-lg shadow-2xs pt-3 px-6 m-4 space-y-8">
          <h3 className="text-lg font-semibold ">Order Summary</h3>
          <div>
            <p className="text-sm mb-1">Pending Orders</p>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">40%</h3>
                <p className="text-sm text-slate-500">100/400 Orders</p>
              </div>
              {/* progress bar */}
              <div className="h-1.5 bg-slate-200 rounded text-yellow-500 "></div>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-sm mb-1">Shipped Orders</p>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">30%</h3>
                <p className="text-sm text-slate-500">100/400 Orders</p>
              </div>
              {/* progress bar */}
              <div className="h-1.5 bg-slate-200 rounded text-yellow-500 "></div>
            </div>
          </div>
        </div>

        <div className="bg-white h-50 m-4 rounded-lg shadow-2xs px-6 pt-3">
          <h3 className="text-lg font-semibold mb-2 ">
            # 10 Top Selling Products
          </h3>

          <div className="h-px bg-black mb-4" />

          {/* map method on top selling products */}
          {/* dummy data */}
          <div className="border border-slate-300 p-2 rounded-lg shadow-md mb-2">
            <div className="flex gap-2 mb-1">
              <img
                src="/men.avif"
                alt=""
                className="size-10 h-12 bg-cover rounded"
              />
              <div className="relative w-full">
                <div>
                  <h4 className="text-xs">
                    Title:{" "}
                    <span className="capitalize font-semibold">men</span>{" "}
                  </h4>
                  <p className="text-xs">
                    Description:{" "}
                    <span className="text-slate-500">Mensware </span>
                  </p>
                </div>

                <div
                  className={`absolute right-0 top-0 ${categoryTag("Fashion")}`}
                >
                  <span className="text-xs font-semibold">Fashion</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs border border-slate-300 px-1 py-0.5 rounded-lg">
                stock: <span className="text-xs font-semibold">1</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg pt-3 px-6 m-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-6">Review Orders</h3>
          {/* make it dynamic */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-700">Created at 5</p>
              <p className="text-sm text-slate-700">username</p>
              <p className="text-sm text-slate-700">from wheere</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-slate-500">id-jkhf</p>
              <p className="text-xs text-slate-500">id-jkhf</p>
              <p className="text-xs text-blue-500 bg-blue-100 p-1 rounded border-blue-300 font-semibold">
                in Transit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SideBar  */}
      {isSidebarOpen && <Sidebar />}
    </div>
  );
};

export default SellerDashboard;
