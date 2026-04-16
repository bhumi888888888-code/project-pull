import { Menu, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "../../components/model/AddProduct";
import { toggleProductModal } from "../../store/slices/popup.slice";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../store/slices/product.slice";

const ManageProducts = () => {
  const { isAdddProductModalOpen } = useSelector((state) => state.popup);
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setfilterCategory] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stock: "",
    category: "",
    price: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredSearch = (products || []).filter((product) => {
    const matchesSearch =
      (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleAddProductModal = () => {
    dispatch(toggleProductModal());
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getProducts());
  };

  // const handleCancelEdit = () => {
  //   isEditModalOpen(false)
  //   setSelectedProduct(null);
  //   setFormData({
  //   title: "",
  //   description: "",
  //   stock: "",
  //   category: "",
  //   price: "",
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    dispatch(updateProduct({ id: selectedProduct._id, data: formData }));
    dispatch(getProducts());
    setIsEditModalOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      stock: product.stock || "",
      category: product.category || "",
      price: product.price || "",
    });
    setIsEditModalOpen(true);
  };

  const categoryTag = (category) => {
    switch (category) {
      case "Menware":
        return "bg-blue-100 text-blue-500 border-blue-500 px-2 py-1 rounded-full";
        break;

      case "Fashion":
        return "bg-yellow-100 text-yellow-500 border-yellow-500 px-2 py-1 rounded-full";
        break;

      case "Books":
        return "bg-gold-100 text-gold-500 border-gold-500 px-2 py-1 rounded-full";
        break;

      case "Home":
        return "bg-green-100 text-green-500 border-green-500 px-2 py-1 rounded-full";
        break;

      case "Other":
        return "bg-gray-100 text-gray-500 border-gray-500 px-2 py-1 rounded-full";
        break;

      default:
        return "bg-gray-100 text-gray-500 border-gray-500 px-2 py-1 rounded-full";
        break;
    }
  };

  const indexColor = (i) => {
    if ((i + 1) % 2 === 0) {
      return "bg-primary-dark";
    }
  };

  // todo - make the edt button change bg according to the category fix filter and search

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="bg-primary min-h-screen p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Manage Products
        </h1>
        <p className="text-sm ">
          Manage your products edit, delete or add new products
        </p>
      </div>
      <div className="h-px w-full bg-black rounded mb-6" />

      {/* Filters */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Search Product</h3>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-400 rounded-md px-2 md:px-4 py-1 flex-1 focus:outline-none placeholder:text-slate-400 w-full"
            placeholder="Search product by title or description"
          />

          <select
            className="border border-slate-400 rounded-md px-2 py-1 text-slate-500 md:w-56"
            value={filterCategory}
            onChange={(e) => setfilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Menware">Menware </option>
            <option value="Fashion"> Fashion</option>
            <option value="Books"> Books</option>
            <option value="Home"> Home</option>
            <option value="Other"> Other</option>
          </select>
        </div>
      </div>

      {/* Add Product */}
      <div className="mt-4 mb-4 ">
        <button
          className="flex gap-1 border border-amber-950 w-full rounded-lg bg-amber-900 items-center justify-center text-primary py-2 font-semibold"
          onClick={() => toggleAddProductModal()}
        >
          <div className="inline ">
            {" "}
            <Plus />
          </div>
          <p>Add Product</p>
        </button>
      </div>

      {/* Add Product */}
      {isAdddProductModalOpen && <AddProduct />}

      <div className="h-px bg-black rounded mb-4" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200 rounded-lg">
            <tr>
              <th className="text-left px-4 py-1">S.No</th>
              <th className="text-left px-4 py-1">Title</th>
              <th className="text-left px-4 py-1">Description</th>
              <th className="text-left px-4 py-1">Stock</th>
              <th className="text-left px-4 py-1">Category</th>
              <th className="text-left px-4 py-1">Units Sold</th>
              <th className="text-left px-4 py-1">Listed on</th>
              <th className="text-left px-4 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSearch &&
              (filteredSearch || []).map((product, i) => (
                <tr
                  key={product._id}
                  className={`border border-slate-300 rounded-lg ${indexColor(i)}`}
                >
                  <td className="text-left py-2 px-4">{i + 1}</td>
                  <td className="text-left py-2 px-4">{product.title}</td>
                  <td className="text-left py-2 px-4">
                    {product.description.slice(0, 30)}
                  </td>
                  <td className="text-left py-2 px-4">{product.stock}</td>
                  <td className="text-left py-2 px-4">{product.category}</td>
                  <td className="text-left py-2 px-4">{product.unitsSold}</td>
                  <td className="text-left py-2 px-4">
                    {product.createdAt.split("T")[0]}
                  </td>
                  <td className="text-left py-2 px-4 flex gap-2">
                    <button
                      onClick={() => {
                        handleEdit(product);
                      }}
                      className="border border-slate-300 px-2 py-1 rounded hover:cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="border border-red-700 bg-red-500 bg px-2 py-1 rounded hover:cursor-pointer hover:bg-red-700"
                      disabled={loading && !product._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {filteredSearch.length === 0 && (
              <tr className="">
                <td
                  colSpan={7}
                  className="text-lg text-slate-500 text-center items-center py-5 "
                >
                  No products found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Is edit modal open */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex justify-center p-6">
          <div className="bg-white rounded-lg p-6 m-4 overflow-x-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Edit Product</h3>
                <p className="text-sm text-slate-500">
                  Edit your product details and information
                </p>
              </div>
              <X
                className="border border-slate-300 p-1 rounded-lg shadow hover:text-slate-700 hover:cursor-pointer hover:shadow-lg transition-all "
                onClick={() => setIsEditModalOpen(false)}
              />
            </div>

            <div className="h-px bg-black rounded mb-4" />

            {/* Product */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-300">
              <div className="mb-2">
                <img
                  src={selectedProduct.images?.[0]?.url}
                  alt="image"
                  className="size-16"
                />
                <div className="flex items-center justify-between p-4">
                  <div className="gap-1">
                    <h3 className="text-lg font-semibold">
                      Title: {selectedProduct.title || "-"}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Description:{" "}
                      {selectedProduct.description.split(150)[0] || "-"}
                    </p>
                  </div>
                  <div className={`${categoryTag(selectedProduct.category)}`}>
                    <p>{selectedProduct.category}</p>
                  </div>
                </div>
              </div>

              <div className="text-sm flex items-start ">
                <p className="text-sm text-slate-600">
                  stock: {selectedProduct.stock || "-"}
                </p>
              </div>
            </div>

            {/* Edit */}
            <form className="" onSubmit={handleSubmit}>
              <div className="space-y-4 mb-4">
                <div className="gap-1">
                  <label className="text-sm text-slate-500">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="border border-slate-300 rounded-md w-full px-3 py-1 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-4">
                  <div className="gap-1">
                    <label className="text-sm text-slate-500">Stock</label>
                    <input
                      type="number"
                      className="md:flex-2 border border-slate-300 w-full px-2 py-1 focus:outline-none rounded  "
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                    />
                  </div>

                  <div className="gap-1">
                    <label className="text-sm text-slate-500">Category</label>
                    <select
                      className="border border-slate-300 w-full md:flex-2 px-2 py-1 focus:outline-none rounded"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="">Category</option>
                      <option value="Menware">Menware</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Books">Books</option>
                      <option value="Home">Home</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-500">Descritpion</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="border border-slate-300 px-2 py-1 md:px-4 md:py-2 rounded-lg focus:outline-none h-26 md:max-h-36"
                    rows={18}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn-danger"
                >
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
