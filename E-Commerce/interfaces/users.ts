import { Document } from "mongoose";

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
}
type UserRole='manager'|'admin'|'user'