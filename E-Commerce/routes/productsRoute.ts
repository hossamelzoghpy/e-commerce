import { Router } from "express";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validators/productsValidator";
import { createProducts, deleteProduct, getAllProducts, getProduct, resizeProductImages, updateProduct, uploadProductImages} from "../controllers/products";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authen";
import reviewsRoute from "./reviewsRoute";
const productsRoute:Router=Router()
productsRoute.use('/:productId/reviews',reviewsRoute)
productsRoute.route('/')
.get(getAllProducts)
.post(protectRoutes,checkActive,allowedTo('manger','admin'),uploadProductImages, resizeProductImages, createProductValidator, createProducts);
productsRoute.route('/:id')
.get(getProductValidator,getProduct)
.put(protectRoutes,checkActive,allowedTo('manger','admin'),updateProductValidator,updateProduct)
.delete(protectRoutes,checkActive,allowedTo('manger','admin'),deleteProductValidator,deleteProduct)
export default productsRoute
