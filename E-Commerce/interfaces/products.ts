import { Document } from "mongoose";
import { Categories } from "./categories";
import { Subcategories } from "./subcategories";

export interface Products extends Document{
    name:string;
    description:string;
    category:Categories;
    subcategory:Subcategories;
    cover:string;
    images:string[];
    price:number;
    quantity:number;
    sold:number;
    priceAfterDiscount:number;
    ratingAverage:number;
    ratingCount:number;

}