import { Router } from "express";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validators/productsValidator";
import { createProducts, deleteProduct, getAllProducts, getProduct, resizeProductImages, updateProduct, uploadProductImages} from "../controllers/products";
const productsRoute:Router=Router()
productsRoute.route('/').get(getAllProducts).post(uploadProductImages, resizeProductImages, createProductValidator, createProducts);
productsRoute.route('/:id').get(getProductValidator,getProduct).put(updateProductValidator,updateProduct).delete(deleteProductValidator,deleteProduct)
export default productsRoute
