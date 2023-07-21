const express= require( "express")
const userController = require("../controller/user-controller")
const userRouter =express.Router();

userRouter.get("/",userController.getAllUsers)
userRouter.post("/signup",userController.signup)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)
userRouter.post("/login",userController.login)
userRouter.get("/booking/:id",userController.getBookingOfUser)



module.exports = userRouter;