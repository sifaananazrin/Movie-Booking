const User= require("../model/User");
const bcrypt =require("bcryptjs")
const Booking=require("../model/Booking")


const getAllUsers=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        return next(err)
    }
    if(!users){
        return res.status(404).json({message:"Unexpected Error Occured"})
    }
    return res.status(200).json({users})
}



const signup=async(req,res,next)=>{
    const {name,email,password}=req.body
if(!name && name.trim()=="" &&
 !email && email.trim=="" && 
 !password && password.trim()==""
 ){
    return res.status(422).json({message:"invalid inputs"})
 }

 const hashedPassword=bcrypt.hashSync(password)
//create new user

let user;
try{
user=new User({
    name,
    email,
    password:hashedPassword
})
user= await user.save()
}catch(err){
    return next(err)
}
if(!user){
    return res.status(500).json({message:"unexpected Error Occured"})
}

 return res.status(201).json({id:user._id})
}


const updateUser = async (req, res, next) => {
    const id = req.params.id; //we will get id from params
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" &&
     !email && email.trim() === "" &&
      !password && password.trim() === "") {
      return res.status(422).json({ message: "invalid inputs" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
      user = await User.findByIdAndUpdate(id, {
        //findByANDuPDATE it will automaticaly will save user data we dont save
        name,
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "something went wrong" });
    }
    return res.status(200).json({ message: "update successfully" });
  };
  
  //delete
  const deleteUser=async(req,res,next)=>{
    const id =req.params.id
    let user;
    try{
user=await User.findByIdAndRemove(id)   //we only need id not need enter data
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(200).json({message:"Deleted Successfully"})
  }


const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "invalid inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find user with this email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // If the password is correct, include the user ID in the response
  const userId = existingUser._id.toString();
  return res.status(200).json({ message: "Login successful", userId });
};



const getBookingOfUser=async(req,res,next)=>{
  const id=req.params.id
  let booking
  try{
 booking=await Booking.find({user:id})
  }catch(err){
    console.log(err)  
  }
  if(!booking){
    return res.status(500).json({message:"Unable to get Booking"})
  }
  return res.status(200).json({booking})
}




module.exports = {
    getAllUsers,
    signup,
    updateUser,
    deleteUser,
    login,
    getBookingOfUser
  };