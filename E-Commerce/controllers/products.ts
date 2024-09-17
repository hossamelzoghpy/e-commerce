import { NextFunction, Request, Response } from 'express'
import { Products } from '../interfaces/products'
import { uploadMultiImages } from '../middlewares/uploadImages'
import productsModel from '../models/productsModel'
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandling'
import sharp from 'sharp'
import multer from 'multer'
import ApiErrors from '../utils/apiErrors'
import asyncHandler from 'express-async-handler';
/*const multerStorage=multer.diskStorage({ /////////////diskStorage
  destination:(req,file,cb)=>{
    cb(null,"uploads")
  },
  filename(req,file,cb){
    const ext=file.mimetype.split('/')[1];
    const imageName:string=`products-${Date.now()}.${ext}`
    cb(null,imageName)
  }
})*/

export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount: 1 }, { name: 'images', maxCount: 10}])
/*export const resizeProductImages = asyncHandler(async (req: Request, res:Response, next: NextFunction) => {
  /*if(req.file){
  const imgName=`products-${Date.now()}.webp`
  await sharp(req.file!.buffer)
  .resize(500,500)
  .toFormat('webp')
  .webp({quality:95})
  .toFile(`uploads/products/${imgName}`)
  req.body.cover = imgName;
  }
  next();
})*/
export const resizeProductImages= asyncHandler( async(req:Request,res:Response,next:NextFunction)=>{
  if (req.files) {
    if (req.files.cover) {
      const imgName = `product-${Date.now()}-cover.webp`
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/products/${imgName}`)
      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `product-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/products/${imgName}`);
        req.body.images.push(imgName);
      }
    ))}
  }
next()
})
export const getAllProducts=getAll<Products>(productsModel,'products')
export const createProducts=createOne<Products>(productsModel)
export const getProduct=getOne<Products>(productsModel,'reviews')
export const updateProduct=updateOne<Products>(productsModel)
export const deleteProduct=deleteOne<Products>(productsModel)

