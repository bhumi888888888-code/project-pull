import { Divide, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuModal } from "../../store/slices/popup.slice";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  ("Menware", "Fashion", "Books", "Home", "Other");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeMenu = () => {
    dispatch(toggleMenuModal());
  };

  const handleCategoryClick = (category) => {
    if (category === "all") {
      navigate(`/user/products`);
    } else {
      navigate(`/user/products?category=${category}`);
    }
    closeMenu();
  };
  return (
    <div className="fixed inset-0 bg-primary  z-50 p-4">
      <div className="flex items-center justify-end text-secondary-dark hover:text-secondary-light/60">
        <X onClick={() => closeMenu()} />
      </div>

      <div>
        <ul className="flex flex-col gap-2 items-center justify-center text-secondary-dark cursor-pointer">
          <li
            className={`hover:underline `}
            onClick={() => handleCategoryClick("all")}
          >
            All Products
          </li>
          <li
            className="hover:underline"
            onClick={() => handleCategoryClick("Fashion")}
          >
            Fashion
          </li>
          <li
            className="hover:underline"
            onClick={() => handleCategoryClick("Books")}
          >
            Books
          </li>
          <li
            className="hover:underline"
            onClick={() => handleCategoryClick("Home")}
          >
            Home
          </li>
          <li
            className="hover:underline"
            onClick={() => handleCategoryClick("Other")}
          >
            Other
          </li>
          <li
            className="hover:underline"
            onClick={()=> navigate("/user/social-media-home-page")}
          >
            Reels
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
