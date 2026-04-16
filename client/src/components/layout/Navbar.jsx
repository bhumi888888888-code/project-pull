import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {  Sidebar, X } from "lucide-react";
import { toggleMenuModal } from "../../store/slices/popup.slice";
import Menu from "./Menu"
import { getCart } from "../../store/slices/cart.slice";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(state => state.cart?.cart?.items || [])
  // console.log("Cart items", items)
  const { authUser } = useSelector(state => state.auth)
  const { products, loading } = useSelector(state => state.product)
  const { isMenuOpen } = useSelector(state => state.popup);


  const [filteredCategory, setfilterCategory] = useState("all");

  const filterSearch = (products || []).filter(product => {
    const matchesCategory = filteredCategory === "all" || product.category === filteredCategory;

    return matchesCategory;
  })

  useEffect(() => {
    console.log("auth user",authUser)
    if (authUser?._id) {
      dispatch(getCart())
    }
  }, [authUser])

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="bg-transparent items-center justify-between p-4 flex  px-10">
    <div className="  items-center justify-between p-4 flex px-10">

      {/* <div className="sm:hidden cursor-pointer"> */}
        <Link to={"/user/cart"}
        className="text-secondary-dark "
        >
          Cart <p>({cartCount})</p>
        </Link>
      </div>

      {/* Left div */}
      <div className="space-x-6 flex items-center ">
        <div className="">
        <Link to={"/"} className="font-bold text-lg ml-1
         text-secondary-dark ">Vrya</Link>

        </div>
        <div className="space-x-6 items-center hidden md:block">
        <Link
          to={"/products"}
          className="text-secondary-light text-sm hover:underline"
        >
          All Products
        </Link>
        <Link
          to={"/women"}
          className="text-secondary-light text-sm  hover:underline"
        >
          Women
        </Link>
        <Link
          to={"/men"}
          className="text-secondary-light text-sm hover:underline"
        >
          Men
        </Link>
        <Link
          to={"/accessories"}
          className="text-secondary-light text-sm hover:underline"
        >
          Accessories
          </Link>
          <Link
            to={"/reels"}
          className="text-secondary-light text-sm hover:underline"
          >
          Reels
          </Link>
          </div>
      </div>


      <div className="flex gap-2 sm:gap-4 items-center ">
        <Link to={"/user/cart"}
        className="text-secondary-dark max-sm:hidden "
        >
          Cart <p>({cartCount})</p>
        </Link>
        <div className="bg-secondary-dark px-3 py-1 rounded-full text-primary  items-center justify-center">
          <button
          onClick={()=> navigate("/user/profile")}
          >
          {authUser?.name.split("")[0]}
         </button>
          {/* if not then add a user icon */}
        </div>
      </div>

      <div onClick={() => dispatch(toggleMenuModal())}
      className="text-secondary-dark"
      >
          <Sidebar />
      </div>

      {isMenuOpen && <Menu />}

    </div>
  );
};

export default Navbar;

      // <div onClick={()=> dispatch(toggleMenuModal())}>
      //     <Menu />
      // </div>

      // {isMenuOpen && (
      //   <div className="fixed inset-0 bg-primary items-center justify-center z-50">
      //     <div className="flex items-center justify-end p-4">
      //     <X  className="text-secondary-dark hover:text-secondary-light/50 hover:cursor-pointer " />
      //     </div>

      //     <div className="flex flex-col items-center justify-center gap-2">
      //        all products
      //     </div>
      //   </div>
      // )}

      // <Product productCategory={filterSearch} />
