import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {  getProducts } from "../../store/slices/product.slice";
import { Heart, Plus, Search } from "lucide-react";
import { toggleWishlist } from "../../store/slices/wishlist.slice";
import { addToCart } from "../../store/slices/cart.slice";


const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");

  const fullSatate = useSelector(store => store)
     console.log("full state:", fullSatate)
  const { user, products, loading } = useSelector((state) => state.product);
  const { wishlist} = useSelector((state) => state.wishlist?.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setfilterCategory] = useState("all");



  const handleToggle = (id) => {
   dispatch(toggleWishlist(id))
  }

  const wishlistSet = useMemo(() => {
    return new Set((wishlist || []).map(id => String(id)))
  },[wishlist])

   console.log("Wishlist:", wishlist)



  useEffect(() => {
    if (category) {
      dispatch(getProducts({ category }));
    } else {
      dispatch(getProducts());
    }
  }, [category]);

  const filterSearch = (products || []).filter((product) => {
    const matchesSearch =
      (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;

    return matchesCategory && matchesSearch;
  });

  const handleHeader = () => {
    if (filterCategory === "all") {
      return "All Products";
    } else {
      return filterCategory;
    }
  };

  const HandleAddToCart = (id, quantity) => {
    dispatch(addToCart({ id, quantity }));
  };

  return (
    <div className="bg-primary min-h-screen overflow-x-auto p-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-center mt-6 text-secondary-dark ">
        <h3 className="text-2xl font-semibold">{handleHeader()}</h3>
      </div>

      {/* Filter */}
      {/* <div className=' flex flex-col sm:flex-row gap-4 items-center'> */}
      <div>
        <div className="text-secondary-dark flex flex-col flex-1 mt-8 mb-2 ">
          <label className="text-lg text-left ml-2 ">Search</label>
          <div className="relative">
            <Search className="absolute top-2 left-2 size-5" />
            <input
              type="text"
              className="input rounded-full pl-8 h-10 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="text-secondary-dark">
          <select
            className="input p-2 h-10"
            value={filterCategory}
            onChange={(e) => setfilterCategory(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="Menware">Menware</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {/* </div> */}

      {/* products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 px-8">
        {(filterSearch || []).map((product) => {

          const isWislisted = wishlistSet?.has(product._id.toString())
          return (
            <div
            key={product._id}
            className="bg-white/30 relative p-2 border-slate-200 rounded shadow-2xs pb-6 "
          >
            <div
              className="flex items-center justify-center p-2 "
              onClick={() => navigate(`/user/product-details/${product._id}`)}
            >
              <img
                src={product.images[0].url}
                alt=""
                className="object-contain h-[50vh] w-[80dvw] rounded"
              />
              <div></div>
            </div>
            <div className="flex justify-between items-center mt-4 text-secondary-dark px-3">
              <h3 className="text-xl">{product.title}</h3>
              <p className="text-lg">${product.price}</p>
            </div>

            <div className="flex items-center justify-end mt-2 gap-2" >

              <button
                className="text-gray-500"
                onClick = {()=> handleToggle(product._id)}
              >
                <Heart size={20} className={` transition ${isWislisted ? "text-red-500 fill-red-500 stroke-red-500": "text-gray-400"} `} fill={isWislisted ? "currentColor" : "none"} />
              </button>

              <button
               className="flex items-center text-secondary-dark "
              onClick={() => HandleAddToCart(product._id, 1)}
              >
               <p>Add to cart</p>
              <Plus className="bottom-1 right-1" />
              </button>


            </div>
          </div>
          )
        })}

        {filterSearch.length === 0 && (
          <div className="flex text-center">
            <p className="text-secondary-dark">
              No product found matching your criteria!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
