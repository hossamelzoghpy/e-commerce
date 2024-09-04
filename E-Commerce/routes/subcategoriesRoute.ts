import { Router } from "express";
import { createSubcategory, deleteSubcategory, filterSubcategories, getAllSubcategories, getSubcategory, updateSubcategory } from "../controllers/subcategories";
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from "../utils/validators/subcategoriesValidator";
const subcategoriesRoute:Router=Router({mergeParams:true})
subcategoriesRoute.route('/').get(filterSubcategories,getAllSubcategories).post(createSubcategoryValidator,createSubcategory)
subcategoriesRoute.route('/:id').get(getSubcategoryValidator,getSubcategory).put(updateSubcategoryValidator,updateSubcategory).delete(deleteSubcategoryValidator,deleteSubcategory)
export default subcategoriesRoute