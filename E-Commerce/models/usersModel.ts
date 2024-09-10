import { Schema, model } from 'mongoose';
import { Users } from '../interfaces/users';
import bcrypt from 'bcryptjs'
const usersSchema: Schema = new Schema<Users>({
    name: { type: String, required: true, trim: true },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image: String,
    role:{type:String,enum:['manger','admin','user'],default:'user'},
    active:{type:Boolean,default:true},
    phone:String,
    resetCode: String,
    passwordChangedAt: Date,
    resetCodeExpireTime: Date,
    resetCodeVerify: Boolean
}, { timestamps: true })
usersSchema.pre<Users>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13);
    next();
})
export default model<Users>('users', usersSchema)

// const imageUrl = (document: Users) => {
//   if (document.image) {
//     document.image = `${process.env.BASE_URL}/users/${document.image}`
//   }
// }