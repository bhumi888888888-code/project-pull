import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="mt-39 ">
        {/* HEADERS */}
        <div className="text-center mb-18 md:mb-8 ">
          <h2 className="text-2xl text-secondary-dark mb-4">The Collections</h2>
          <p className="text-secondary-dark text-xl text-center mx-24">
            Explore our latest arrivals in men woman and accessories
          </p>
        </div>

        {/* IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-8 sm:p-6">
          <div className="relative h-140 overflow-hidden ">
            <img
              src="/men.avif"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 md:left-6 md:top-4.5 md:block flex items-end justify-center bottom-8 ">
              <Link
                to={"/men"}
                className="text-white hover:cursor-pointer md:text-sm text-xl underline"
              >
                Shop Men
              </Link>
            </div>
          </div>
          <div className="relative  h-140 overflow-hidden ">
            <img
              src="/accessories.avif"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute justify-center items-end flex inset-0 bottom-8 md:left-6 md:top-4.5 md:block ">
              <Link
                to={"/accessories"}
                className="text-secondary-dark text-2xl hover:cursor-pointer underline md:text-sm"
              >
                Shop Accessories
              </Link>
            </div>
          </div>
          <div className="relative  h-140 overflow-hidden ">
            <img
              src="/women.avif"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-center bottom-8 md:block top-4.5 left-6">
              <Link
                to={"/women"}
                className="text-white text-2xl underline hover:cursor-pointer md:text-sm "
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
