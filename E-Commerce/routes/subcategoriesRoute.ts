import { Router } from "express";
import { createSubcategory, deleteSubcategory, filterSubcategories, getAllSubcategories, getSubcategory, updateSubcategory } from "../controllers/subcategories";
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utils/validators/subcategoriesValidator";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authen";
const subcategoriesRoute:Router=Router({mergeParams:true})
subcategoriesRoute.route('/')
.get(filterSubcategories,getAllSubcategories)
.post(protectRoutes,checkActive,allowedTo('manger','admin'),createSubcategoryValidator,createSubcategory)
subcategoriesRoute.route('/:id')
.get(getSubcategoryValidator,getSubcategory)
.put(protectRoutes,checkActive,allowedTo('manger','admin'),updateSubcategoryValidator,updateSubcategory)
.delete(protectRoutes,checkActive,allowedTo('manger','admin'),deleteSubcategoryValidator,deleteSubcategory)
export default subcategoriesRoute