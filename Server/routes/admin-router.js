const express = require("express");
const admin = require("../model/Admin");
const adminRouter = express.Router();
const adminController = require("../controller/admin-controller");

adminRouter.post("/signup", adminController.addAdmin);
adminRouter.post("/login", adminController.adminLogin);
adminRouter.get("/",adminController.getAllAdmins)
module.exports = adminRouter;
