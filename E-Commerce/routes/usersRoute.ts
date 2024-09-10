import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateUser, uploadUserImage } from "../controllers/users";
import { changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utils/validators/usersValidator";
const usersRoute:Router=Router()
usersRoute.route('/').get(getAllUsers)
.post(uploadUserImage,resizeUserImage,createUserValidator,createUser)

usersRoute.route('/:id').get(getUserValidator,getUser)
.put(uploadUserImage,resizeUserImage,updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)

usersRoute.put('/:id/changePassword',changeUserPasswordValidator,changeUserPassword)
export default usersRoute