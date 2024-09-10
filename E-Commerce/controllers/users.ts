import { Users } from '../interfaces/users'
import usersModel from '../models/usersModel'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandling'
import { NextFunction, Request, Response } from 'express'
import { uploadSingleImage } from '../middlewares/uploadImages'
import sharp from 'sharp'
// manger
export const getAllUsers=getAll<Users>(usersModel,'users')
export const createUser=createOne<Users>(usersModel)
export const getUser=getOne<Users>(usersModel)
export const deleteUser=deleteOne<Users>(usersModel)
export const updateUser=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user=await usersModel.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        image:req.body.image,
        phone:req.body.phone,
        active:req.body.active,

    },{new:true})
    res.status(200).json({data:user})
})
export const changeUserPassword=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user=await usersModel.findByIdAndUpdate(req.params.id,{
        password:bcrypt.hash(req.body.password,13),
        passwordChangedAt:Date.now()

    },{new:true})
})
export const uploadUserImage=uploadSingleImage('image')
export const resizeUserImage = asyncHandler(async (req: Request, res:Response, next: NextFunction) => {
    if(req.file){
        const imgName=`user-${Date.now()}.webp`
        await sharp(req.file.buffer)
        .toFormat('webp')
        .webp({quality:95})
        .toFile(`uploads/users/${imgName}`)
        req.body.image = imgName;
    }
    next()
})
// user Logged


