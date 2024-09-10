import { Router } from "express";
import { login, signup } from "../controllers/authen";
import { loginValidator, signupValidator } from "../utils/validators/authenValidator";
const authenRoute:Router=Router()
authenRoute.post('/signup',signupValidator,signup)
authenRoute.post('/login',loginValidator,login)
export default authenRoute