const express=require("express")
const movieRouter=express.Router()
const movieController=require("../controller/movie-controller")

movieRouter.post("/",movieController.addMovie)
movieRouter.get("/hello",movieController.hello)
movieRouter.get("/getall",movieController.getAllMovies)
movieRouter.get("/:id",movieController.getMovieById)

module.exports = movieRouter;