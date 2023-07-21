const express =require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const dotenv=require("dotenv")
const userRouter = require("./routes/user-routes")
const adminRouter=require("./routes/admin-router")
const movieRouter=require("./routes/movie-routes")
const bookingRouter=require("./routes/booking-router")
dotenv.config()
const app=express()
app.use(cors());

//Middleware
app.use(express.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/booking",bookingRouter)

mongoose.connect(`mongodb+srv://shifananazrin15:${process.env.MONGO_PASSWORD}@cluster0.yqtluub.mongodb.net/test`)
.then(()=>app.listen(5001,()=>console.log("Connected To Database"))).catch((e)=>console.log(e))

