import { Document } from "mongoose";
import { Products } from "./products";

export interface Users extends Document{
    name:string;
    email:string;
    password:string;
    phone:string;
    role:UserRole;
    image:string;
    active:boolean;
    passwordChangedAt:Date|number;
    resetCode:string|undefined;
    resetCodeExpireTime:Date|number|undefined;
    resetCodeVerify:boolean|undefined;
    wishlist:Products[];
    address:UserAddress[];
}
type UserRole='manger'|'admin'|'user'
export interface UserAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}