import { Router } from "express";
import { forgerPassword, login, resetCode, signup, verifyResetCode } from "../controllers/authen";
import { forgetPasswordValidator, loginValidator, resetPasswordValidator, signupValidator } from "../utils/validators/authenValidator";
const authenRoute:Router=Router()
authenRoute.post('/signup',signupValidator,signup)
authenRoute.post('/login',loginValidator,login)
authenRoute.post('/forgetPassword', forgetPasswordValidator, forgerPassword);
authenRoute.post('/verifyCode', verifyResetCode);
authenRoute.put('/resetCode', resetPasswordValidator, resetCode);
export default authenRoute