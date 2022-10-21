import express from 'express'
// import { Knex } from "Knex";
// import { Server as SocketIO } from 'socket.io'
// import UserService from '../services/userService'
// import UserController from '../controllers/userController'
// import { Request } from 'express'
// import crypto from 'crypto';
// import { checkPassword, hashPassword } from "../untils/bcypt";
// import { client } from "../untils/DB";
// import { form } from "../untils/formidable";
import UserController from '../controllers/userController'
// import userService from "../services/userService";

export const userRoutes = express.Router()

let userController = new UserController()

//攪 Google login
userRoutes.get('/login/google', userController.loginGoogle)

userRoutes.post('/register', userController.register)

//login  function

userRoutes.post('/login', userController.login)

//Logout function
userRoutes.post('/logout', userController.logout)

userRoutes.get('/getme', userController.getme)

//拎 user info
userRoutes.get('/user_info', userController.userInfo)
