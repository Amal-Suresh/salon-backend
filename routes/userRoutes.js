const express =require('express')

const userController = require('../controller/userController')

const userRoute =express.Router()


userRoute.post('/register',userController.userRegister)
userRoute.post('/verify-otp',userController.verifyOtp)
userRoute.post('/resent-otp',userController.resendOtp)
userRoute.post('/login',userController.userLogin)
userRoute.post('/verify-login',userController.userLoginVerification)






module.exports = userRoute;