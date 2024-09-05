
import { Products } from '../interfaces/products'
import productsModel from '../models/productsModel'
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandling'
export const getAllProducts=getAll<Products>(productsModel,'products')
export const createProducts=createOne<Products>(productsModel)
export const getProduct=getOne<Products>(productsModel)
export const updateProduct=updateOne<Products>(productsModel)
export const deleteProduct=deleteOne<Products>(productsModel)
