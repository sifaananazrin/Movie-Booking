import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie/");
  console.log(res);
  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};


export const sendUserRequest=async(data,signup)=>{
  const res= await axios
  .post(`/user/${signup ? "signup" : "login"}`,{
    name:signup ? data.name:"",
    email:data.email,
    password:data.password,
  }).catch((err)=>console.log(err))  

  //validation
  if(res.status!==200  && res.status!==201){
    console.log("Uexpected Error Occire")
  }
  const resData=await res.data;
  return resData;

}


export const  sendAdminRequest=async(data)=>{
  const res=await axios
  .post("/admin/login",{
    email:data.email,
    password:data.password
  })
  .catch((err)=>console.log(err))
  //validation
  if(res.status!==200){
    return console.log("Uexpected Error")
  }
  const resData=await res.data
  return resData;
}

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`);
    if (response.status === 200) {
      const data = await response.data;
      return data;
    } else {
      console.log("Unexpected error");
    }
  } catch (error) {
    console.log(error);
  }
};


export const newBooking = async (data) => {
  try {
      console.log("banu",data)
    const res = await axios.post("/booking/", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    });
    
    if (res && res.status && res.status === 201) {
      const resData = await res.data;
      return resData;
    } else {
      console.log("Unexpected Error");
    }
  } catch (error) {
    console.log(error);
  }
};
