import { Router } from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../controllers/subCategories";
const subCategoriesRoute:Router=Router()
subCategoriesRoute.route('/').get(getAllSubCategories).post(createSubCategory)
subCategoriesRoute.route('/:id').get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory)
export default subCategoriesRoute