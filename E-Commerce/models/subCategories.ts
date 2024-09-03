import {Schema,model} from 'mongoose'
import { SubCategories } from '../interfaces/subCategories'
const subCategoriesSchema=new Schema<SubCategories>({
    name:{type:String,required:true,trim:true},
    image:String,
    category:{type:Schema.Types.ObjectId,ref:'categories'}

},{timestamps:true})
export default model<SubCategories>('subcategories',subCategoriesSchema)