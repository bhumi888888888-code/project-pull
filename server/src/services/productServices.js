import Product from "../models/product.model.js"


const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
}

const updateProduct = async (productInfo ,id) => {
  const product = await Product.findByIdAndUpdate(id, productInfo);
  return product;
}
