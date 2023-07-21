const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  
  let existingUser;
  try {
    existingUser = await Admin.findOne({ email });
  } catch (err) {
    console.log(er);
  }
  if (existingUser) {
    return res.status(400).json({ message: "Admin Already Exists" });
  }
  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({
      email,
      password: hashedPassword,
    });
    admin = await admin.save();
  } catch (err) {
    console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "unable to store admin" });
  }
  return res.status(201).json({ admin });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {

    return res.status(422).json({ message: "invalid inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
     res.status(500).json({ message: "Server error" });
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
const token=jwt.sign({id:existingAdmin.id},process.env.JWT_PAWWORD,{
    expiresIn:"7d"
})
  
  return res.status(200).json({ message: "Authentication Completed",token,id:existingAdmin.id });
};





const getAllAdmins=async(req,res,next)=>{
  let admins;
  try{
    admins=await Admin.find();
  }catch(err){
    console.log(err)
  }
  if(!admins){
    return res.status(500).json({message:"internal  server error"})
  }
  return res.status(200).json({admins})
}





module.exports = {
  addAdmin,
  adminLogin,
  getAllAdmins
};
