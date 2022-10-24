import express from 'express'

import UserController from '../controllers/userController'

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
