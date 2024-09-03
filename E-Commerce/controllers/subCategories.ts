import { NextFunction,Request,Response } from 'express'
import asyncHandler from 'express-async-handler'
import { SubCategories } from '../interfaces/subCategories'
import subCategoriesModel from '../models/categoriesModel'
export const getAllSubCategories=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const subCategories:SubCategories[]=await subCategoriesModel.find()
    res.status(200).json({data:subCategories})

});
export const createSubCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const subCategory= await subCategoriesModel.create(req.body)
    res.status(201).json({data:subCategory})
})
export const getSubCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const subCategory:SubCategories | null = await subCategoriesModel.findById(req.params.id)
    res.status(200).json({data:subCategory})
})
export const updateSubCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const subCategory:SubCategories | null = await subCategoriesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({data:subCategory})
})
export const deleteSubCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const subCategory:SubCategories | null = await subCategoriesModel.findByIdAndDelete(req.params.id)
    res.status(204).json()//204 no content
})
