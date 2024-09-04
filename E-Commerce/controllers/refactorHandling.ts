import { Model } from "mongoose";
import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/filterData";
import ApiErrors from "../utils/apiErrors";
export const getAll = <modelType>(model: Model<any>, modelName: string) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let filterData:any={}
    if(req.filterData){
        filterData=req.filterData;
    }
    const documents: modelType[] = await model.find(filterData)
    res.status(200).json({ data: documents })
  });
export const getOne=<modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const documents:modelType|null=await model.findById(req.params.id)
        if(!documents){return next(new ApiErrors(`Document not fount`,404))}
        res.status(200).json({data:documents})
        

    })

export const createOne=<modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const documents:modelType=await model.create(req.body)
        if(!documents){return next(new ApiErrors(`Document not fount`,404))}
        res.status(201).json({data:documents})

    })

export const updateOne=<modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const documents:modelType|null=await model.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!documents){return next(new ApiErrors(`Document not fount`,404))}
        res.status(200).json({data:documents})

    })

export const deleteOne=<modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const documents:modelType|null=await model.findByIdAndDelete(req.params.id)
        if(!documents){return next(new ApiErrors(`Document not fount`,404))}
        res.status(200).json({data:documents})

    })