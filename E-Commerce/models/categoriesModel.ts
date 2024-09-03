import {Schema,model} from 'mongoose'
import { Categories } from '../interfaces/categories'
const categorySchema=new Schema<Categories>({
    name:{type:String,required:true,unique:true,trim:true},
    image:{type:String}

},{timestamps:true})
export default model<Categories>('categories',categorySchema)