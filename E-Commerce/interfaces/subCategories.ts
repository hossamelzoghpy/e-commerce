import { Document } from "mongoose";
import {Categories} from './categories'
export interface SubCategories extends Document{
    name:string;
    image:string;
    category:Categories
}