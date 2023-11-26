import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import Movieitem from "./Movies/Movieitem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MyPagination from "../component/Pagination/Pagination";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const size = 3; // Define the desired size per page
  const [total, setTotal] = useState(0); // Initialize total with 0
   const finaltotal=total/size
  useEffect(() => {
    fetchMovies();
  }, [page]);

  // const fetchMovies = () => {
  //   getAllMovies(page, size)
  //     .then((data) => {
  //       setMovies(data.movies);
  //       console.log("gggg",data.movies)
  //       setTotal(data.total);
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  const fetchMovies = async () => {
    const res = await axios.get("/movie/getall",{
      params:{
          page:page,
          size:size
      }
      
    });
    setMovies(res.data.movies);
      //  console.log("gggg",data.movies)
       setTotal(res.data.total);
    console.log(res.data)
  }
  const handlePaginationChange = (newPage) => {
    setPage(newPage);
    console.log("mental",newPage)
  };
  return (
    <div>
      <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
        <Box margin={"auto"} width="80%" height={"60vh"} padding={2}>
          <img
            src="https://th.bing.com/th/id/R.01f677dcd6aceb80be88b59d3548d7cd?rik=WuM6Dsd8K9gWRQ&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f9800000%2f-AVATAR-avatar-2009-film-9856003-1680-1050.jpg&ehk=cWe255B7zBnWiMcJQWty99a6BjmIxFtue2N0Uyp5hCc%3d&risl=&pid=ImgRaw&r=0"
            alt="Avathar"
            width={"100%"}
            height={"100%"}
          />
        </Box>
        <Box padding={5} margin="auto">
          <Typography variant="h4" textAlign={"center"}>
            Latest Movies
          </Typography>
        </Box>
        <Box
          margin={"auto"}
          marginTop={5}
          display="flex"
          width="80%"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {movies && movies.map((movie, index) => (
            <Movieitem
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
        </Box>
        <Box display="flex" padding={5} margin="auto" justifyContent={"center"}>
          {/* <Button
            LinkComponent={Link}
            to="/movie"
            variant="outlined"
            sx={{ margin: "auto", color: "#2b2d42" }}
          >
            View All Movies
          </Button> */}
          <MyPagination total={finaltotal} onPageChange={handlePaginationChange} />
        </Box>
      </Box>
    </div>
  );
};

export default Home;