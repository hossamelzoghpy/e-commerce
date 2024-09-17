import * as all from '../interfaces'
import { Application } from "express";
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from "./subcategoriesRoute";
import globalErrors from '../middlewares/globalErrors';
import { NextFunction, Request, Response } from "express";
import ApiErrors from '../utils/apiErrors';
import productsRoute from './productsRoute';
import usersRoute from './usersRoute';
import authenRoute from './authenRoute';
import wishlistRoute from './wishlistRoute';
import addressRoute from './addressRoute';
import couponsRoute from './couponsRoute';
import reviewsRoute from './reviewsRoute';
import cartRoute from './cartRoute';
import ordersModel from '../models/ordersModel';

const mountRoutes=(app:Application)=>{
    app.use('/api/v1/categories',categoriesRoute)
    app.use('/api/v1/subcategories',subcategoriesRoute)
    app.use('/api/v1/products',productsRoute)
    app.use('/api/v1/users',usersRoute)
    app.use('/api/v1/authen',authenRoute)
    app.use('/api/v1/wishlist',wishlistRoute)
    app.use('/api/v1/address',addressRoute)
    app.use('/api/v1/coupons',couponsRoute)
    app.use('/api/v1/reviews',reviewsRoute)
    app.use('/api/v1/carts',cartRoute)
    app.use('/api/v1/orders',ordersModel)
    app.all('*',(req:Request,res:Response,next:NextFunction)=>{
        return next(new ApiErrors(`the route of ${req.originalUrl} not found`,400))
    })
    app.use(globalErrors)
}
export default mountRoutes;