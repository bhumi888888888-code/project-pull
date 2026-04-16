import React from "react";
import { Link } from "react-router-dom";
import MostCoveted from "../../components/MostCoveted";
import ShopTheLook from "../../components/ShopTheLook";
import Navbar from "../../components/layout/Navbar";
import Header from "../../components/Header";

const HomePage = () => {
  return (
    <>
      <div className="">
        <div className="h-screen bg-[url('/home-background.avif')] bg-cover bg-center items-center p-8">
          <Navbar />

          <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
            <div className="flex items-center justify-center text-center md:justify-between ">
              <div className="text-center cursor-pointer mt-10">
                <h1 className="text-3xl font-semibold text-secondary-dark mb-4">
                  Style, Redefined
                </h1>
                <p className="text-xl font-light text-secondary-dark">
                  Uncomplicated, essential pieces{" "}
                </p>
                <p className="text-xl font-light text-secondary-dark">
                  you'll reach for again and again
                </p>
                <button className="border text-secondary-dark border-secondary-dark text-2xl px-4 py-2 hover:underline mt-2">
                  <Link to={"/user/products"}>Shop All</Link>
                </button>
              </div>
            </div>

            <div className="bg-primary p-5 text-center justify-center flex mt-33 w-full ">
              <div>
                <img src="/home-bag.avif" alt="" className="" />
              </div>
              <div className="space-y-27 ml-5">
                <div className="">
                  <p className="text-secondary-dark font-semibold">
                    The mid-season sale is on!
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="text-secondary-dark font-semibold tracking-tighter">
                    Up to 40% Off
                  </p>
                  <p className="text-secondary-dark font-semibold underline">
                    <Link to={"/products"}>Shop Now</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Header />
        </div>

        <div>
          <MostCoveted />
        </div>

        <div>
          <ShopTheLook />
        </div>
      </div>
    </>
  );
};

export default HomePage;
