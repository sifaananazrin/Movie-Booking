import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Autocomplete,
  TextField,
  Tab,
  Tabs,
  
} from "@mui/material";
import { Link } from 'react-router-dom';

import LiveTvIcon from "@mui/icons-material/LiveTv";
import  {getAllMovies} from "../api-helpers/api-helpers";
import { useDispatch, useSelector } from "react-redux";
import { AdminActions, userActions } from "../store";


const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [value,setValue]=useState(0)
    const [movies,setMovies]=useState([])
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .catch(err=>console.log(err)) 
    },[])


    const logout=(isAdmin)=>{
      dispatch(isAdmin?AdminActions.logout():userActions.logout())
    }
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <LiveTvIcon />
        </Box>
        <Box width={"20%"} margin={"auto"}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField 
             sx={{ input : {color:"white"}}}
              variant="standard" {...params} placeholder="Search Movies" />
            )}
          />
        </Box>
        <Box display="flex">
  <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
    <Tab LinkComponent={Link} to="/movies" label="Movies" />

    { !isAdminLoggedIn && !isUserLoggedIn && (
      <>
    <Tab LinkComponent={Link} to="/admin"  label="Admin" />
    <Tab  LinkComponent={Link} to="/auth" label="Auth" />
    </>
    )}
    {/* //////////////// */}
    {isUserLoggedIn && (
      <>
    <Tab LinkComponent={Link} to="/user"  label="Profile" />
    <Tab  onClick={()=>logout(false)}  LinkComponent={Link} to="/" label="logout" />
    </>
    )}
{/* //////////////////////////// */}
{isAdminLoggedIn && (
      <>
    <Tab LinkComponent={Link} to="/user"  label="Add Movie" />
    <Tab LinkComponent={Link} to="/admin"  label="Profile" />

    <Tab  onClick={()=>logout(true)}  LinkComponent={Link} to="/" label="logout" />
    </>
    )}

    {/* //after logout we need to  remove id from the localStorage */}
  </Tabs>
</Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
