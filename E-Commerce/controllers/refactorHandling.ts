import { Model } from "mongoose";
import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/filterData";
import ApiErrors from "../utils/apiErrors";
import Features from "../utils/features";
export const getAll = <modelType>(model: Model<any>, modelName: string) =>
asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let filterData:any={}
    let searchLength:number=0
    if(req.filterData){
        filterData=req.filterData;
    }
    if(req.query){
        const searchResult:Features=new Features(model.find(filterData),req.query).filter().search(modelName)
        const searchData:modelType[]=await searchResult.mongooseQuery;
        searchLength=searchData.length

    }
    const documentsCount:number=searchLength || await model.find(filterData).countDocuments()
    const features:Features=new Features(model.find(filterData),req.query).filter().sort().limitFields().pagination(documentsCount)
    const {mongooseQuery,paginationResult}=features
    const documents: modelType[] = await mongooseQuery
    res.status(200).json({length:documents.length, pagination:paginationResult,data: documents })
  });
export const getOne = <modelType>(model: Model<any>, populateOptions?: string) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let query = model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const documents: modelType | null = await query;
    if (!documents) { return next(new ApiErrors('Document not fount', 404)) }
    res.status(200).json({ data: documents })
  })

export const createOne=<modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const documents:modelType=await model.create(req.body)
        if(!documents){return next(new ApiErrors(`Document not fount`,404))}
        res.status(201).json({data:documents})

    })

export const updateOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const documents = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!documents) { return next(new ApiErrors('Document not found', 404)) }
    documents.save();
    res.status(200).json({ data: documents })
  })

export const deleteOne=<modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const documents:modelType|null=await model.findOneAndDelete({_id:req.params.id})
        if(!documents){return next(new ApiErrors(`Document not fount`,404))}
        res.status(204).json()

    })