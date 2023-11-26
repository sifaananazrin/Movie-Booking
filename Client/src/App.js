import React from "react"
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import Header from "./component/Header"
// import Movies from "./component/Movies/Movies";

import Admin from "./component/Admin/Admin";
import Auth from "./component/Auth/Auth";
import Home from "./component/Home";

import { useEffect } from "react";
import { AdminActions, userActions } from "./store";
import Booking from "../src/component/Booking/Booking";
const LazyMovie=React.lazy(()=>import('./component/Movies/Movies'))
function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
console.log("isAdminLoggedIn",isAdminLoggedIn)
console.log("isUserLoggedIn",isUserLoggedIn)

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(AdminActions.login());
    }
  }, [localStorage.getItem("userId"), localStorage.getItem("adminId")]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
     

          {/* <Route path="/movie" element={<Movies />} />
           */}
           <Route path="/movie" element={
           <React.Suspense fallback="Loading....">
           <LazyMovie />
           </React.Suspense>
           } 
           
           />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking/:id" element={<Booking />} />

        </Routes>
      </section>
    </div>
  );
}

export default App;
