const jwt =require("jsonwebtoken");
const mongoose=require("mongoose")
const Movie = require("../model/Movie");
const Admin = require("../model/Admin");
//At first want to validate token

// const addMovie=async(req,res,next)=>{
//     const extractedToken=req.headers.authorization.split(" ")[1];
//     if(!extractedToken && extractedToken.trim()==""){
//         return res.status(404).json({message:"Token Not Found"})
// }
// // verification process
// // 1]verify-decryptToken
// // 2]store admin id from decrypted Token

// // =======================
// let adminId;
// //verify Token
// jwt.verify(extractedToken,process.env.JWT_PAWWORD,(err,decrypted)=>{
//     if(err){
//         return res.status(400).json({message:`${err.message}`})
//     }else{
//         adminId=decrypted.id
//         return;
//     }
// })

// //create new movie
// const {title,description,releaseDate,posterUrl,featured,actors}=req.body
// //provide validation checks
// if(!title && title.trim()==" " && !description && description.trim()==" " && !releaseDate && releaseDate.trim()==" " &&!postUrl && postUrl.trim()==" " && !featured && featured.trim()==" " &&
// !actors && actors.trim()==" " ){
//     return res.status(422).json({message:"Invalid Inputs"})
// }

// let movies;
// try{
//     movies= new Movie({
//     title,
//     description,
//     actors,
//     releaseDate:new Date(`${releaseDate}`),
//     featured,
//     admin:adminId,
//     posterUrl
// })
// const session=await mongoose.startSession()
// const adminUser=await Admin.findById(adminId)
// session.startTransaction();
// //we need save the movie
// await movies.save({session});
// adminUser.addMovies.push(movies);
// await adminUser.save({session})
// await session.commitTransaction();




// // movies= await movies.save() 
// }catch(err){
//     console.log(err)
// }
// if(!movies){
//     return res.status(500).json({message:"Request Failed"})
// }
// return res.status(201).json({movies})
// }
const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token Not Found" });
    }
  
    let adminId;
    jwt.verify(extractedToken, process.env.JWT_PAWWORD, (err, decrypted) => {
      if (err) {
        return res.status(400).json({ message: `${err.message}` });
      } else {
        adminId = decrypted.id;
        return;
      }
    });
  
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (!title && title.trim() === "" && !description && description.trim() === "" 
    && !releaseDate && releaseDate.trim() === "" && !posterUrl && posterUrl.trim() === "" && 
    !featured && featured.trim() === "" && !actors && actors.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
  
    const newMovie = new Movie({
      title,
      description,
      releaseDate: new Date(releaseDate),
      posterUrl,
      featured,
      actors,
      admin: adminId,
      
    });
  
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      
      await newMovie.save({ session });
  
      const admin = await Admin.findById(adminId);
      admin.addMovies.push(newMovie);
      await admin.save({ session });
  
      await session.commitTransaction(); //if operation is successfull then we call this
    } catch (err) {
      console.log(err);
      if (session) {
        await session.abortTransaction();  //if an error occur we can call this 
      }
      return res.status(500).json({ message: "Request Failed" });
    }
  
    return res.status(201).json({ movie: newMovie });
  };
  


  const getAllMovies = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size) || 3;
    console.log("gggg",page)
      // Calculate the total count of movies based on the pagination
      const total = await Movie.countDocuments();
  
      const skip = (page - 1) * size;
      const movies = await Movie.find().skip(skip).limit(size);
  
      res.status(200).json({ movies, total, size, page });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request Failed" });
    }
  };



const getMovieById=async(req,res,next)=>{
    const id=req.params.id;
    // console.log(id)
    let movie;
    try{
        movie=await Movie.findById(id)
    }catch(err){
        console.log(err)
    }
    if(!movie){
        return res.status(404).json({message:"invalid Movie Id"})
    }
    return res.status(200).json({movie})
} 
const hello=(req,res,next)=>{
  res.status(200).json("{movie}")
} 




module.exports = {
    addMovie ,
    getAllMovies,
    getMovieById,
    hello
}
