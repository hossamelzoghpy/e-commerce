import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categories";
import subcategoriesRoute from "./subcategoriesRoute";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validators/categoriesValidator";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authen";
const categoriesRoute:Router=Router()
categoriesRoute.use('/:categoryId/subcategories',subcategoriesRoute)
categoriesRoute.route('/')
.get(getAllCategories)
.post(protectRoutes,checkActive,allowedTo('manger','admin'),createCategoryValidator,createCategory)
categoriesRoute.route('/:id')
.get(getCategoryValidator,getCategory)
.put(protectRoutes,checkActive,allowedTo('manger','admin'),updateCategoryValidator,updateCategory)
.delete(protectRoutes,checkActive,allowedTo('manger','admin'),deleteCategoryValidator,deleteCategory)
export default categoriesRoute