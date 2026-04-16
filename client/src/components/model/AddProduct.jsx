import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/slices/seller.slice";
import { getProducts } from "../../store/slices/product.slice";
import { useRef } from "react";
import { toggleProductModal } from "../../store/slices/popup.slice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { isAdddProductModalOpen } = useSelector((state) => state.popup);
  const { products, loading } = useSelector((state) => state.seller);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stock: "",
    category: "",
    price: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const ref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("price", formData.price);
    selectedFiles.forEach((file) => {
      data.append("images", file);
    });
    const res = await dispatch(createProduct(data));
    console.log("DISPATCH RESULT", res);
    if (createProduct.fulfilled.match(res)) {
      await dispatch(getProducts());
      dispatch(toggleProductModal());
      setFormData({
        title: "",
        description: "",
        stock: "",
        category: "",
        price: "",
      });
      setSelectedFiles([]);
    }
  };

  const closeModal = () => {
    dispatch(toggleProductModal());
  };

  const handleFilePick = (e) => {
    const list = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...list]);
    e.target.value;
  };

  // useEffect(() => {
  //   dispatch(getProducts())
  // },[])

  return (
    <div className="bg-black/50 backdrop-blur-lg fixed z-50 inset-0 flex  justify-center items-center h-screen  ">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full m-6 ">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-2xl font-semibold">Add Product</h3>
          <X
            className="border border-slate-300 rounded-sm hover:text-slate-600 hover:shadow-lg"
            onClick={closeModal}
          />
        </div>
        <div className="h-px bg-black" />

        {/* Form */}
        <form className="space-y-6  mt-8" onSubmit={handleSubmit}>
          <div className="w-full ">
            <label className="w-full flex items-center justify-center  border-dashed border-2 border-slate-400 p-6 rounded-lg cursor-pointer ">
              <span className="text-sm text-slate-500 ">
                {" "}
                Click to upload images
              </span>

              <input
                type="file"
                ref={ref}
                className="hidden"
                onChange={handleFilePick}
                multiple
                required
              />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-500">Title</label>
            <input
              type="text"
              className="border border-slate-300 rounded-md px-2 py-1 w-full focus:outline-none"
              placeholder="Basketball"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-500">Category</label>
            <select
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">Category</option>
              <option value="Menware">Menware</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-500">Stock</label>
            <input
              type="number"
              className="border border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none"
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-500">Price ( $USD )</label>
            <input
              type="number"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-500">Description</label>
            <textarea
              className="border border-slate-300 rounded-lg px-2 py-1 md:px-4 md:py-2 min-h-28"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="write about your product..."
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button className="btn-outline" onClick={closeModal} type="button">
              Cancel
            </button>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
