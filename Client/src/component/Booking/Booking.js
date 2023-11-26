import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography, inputClasses } from '@mui/material';

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [inputs,setInputs]=useState({seatNumber:"",date:""})
  const { id } = useParams();
  console.log("hello",id)

  useEffect(() => {
    getMovieDetails(id)
      .then((res) =>{ 
        setMovie(res.movie)
        console.log("mental",res)
    } )
      .catch((err) => console.log(err));
  }, [id]);

//   console.log("data",movie);
const handleChange=(e)=>{
    setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
}

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("zaaz",inputs)
    newBooking({...inputs,movie:movie._id})
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
}

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography padding={3} fontFamily={'fantasy'} variant='h4' textAlign={'center'}>
            Book Tickets of Movie: {movie.title}
          </Typography>
          <Box display={'flex'} justifyContent={'center'}>
            <Box display={'flex'} flexDirection={'column'} padding={3} width='50%' margin={"auto"}>
              <img width='80%' height='300px' src={movie.posterUrl} alt={movie.title} />
           
              <Box width={"50%"} marginRight={3} padding={2}>
                <Typography paddingTop={2}>
                  {movie.description}
                </Typography>
                <Typography fontWeight={'bold'} marginTop={1}>
                  starrar
                  { movie.actors.map((actor)=>  " "+  actor + " " )}
                </Typography>
                <Typography fontWeight={'bold'} marginTop={1}>
                  release Date:{new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form  onSubmit={handleSubmit}>
                <Box padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}>
                  <FormLabel>
                    seatNumber
                  </FormLabel>
                  <TextField
                  value={inputs.seatNumber}
                  onChange={handleChange}
                    name="seatNumber"
                    type="number"
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>
                    Booking Date
                  </FormLabel>
                  <TextField
                  value={inputs.date}
                  onChange={handleChange}
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                  />
                  <Button type="submit" sx={{mt:3}}>Book Now</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
      }  

export default Booking;
