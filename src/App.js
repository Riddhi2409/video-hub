import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route,Navigate,Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import GoogleLoginButton from "./Components/Auth/Login/Login2";
import { useAuth } from "./contexts/authContext";
import request from "./request";
import SearchScreen from "./Pages/SearchScreen";
import { useFun } from "./contexts/youtubeContext.js";

const App = () => {
  const {accesstoken} = useAuth()

  const PrivateRoute = () => {
    if(accesstoken===""){
    console.log("Value",accesstoken);
    }
    return accesstoken!==""? 
      <>
         <Navbar setSidebar={setSidebar} /> 
        <Outlet />
      </> : <Navigate replace to='/login' />
  };

  
  

  const {subscriber,getSubscribedChannels,sidebar,setSidebar}=useFun()
 

 useEffect(()=>{
  // if(accesstoken){
  console.log("rin")
  console.log(subscriber)
    getSubscribedChannels();
  // }
 },[accesstoken])
 
 
  
  return (
    <div className="w-full h-screen flex flex-col">
     
      <Routes>
      <Route path="/login" element={<GoogleLoginButton />} />
      {/* <Route path="/register" element={<Register />} /> */}


      <Route path='/' element={<PrivateRoute />} >
            <Route path='/' element={<Home  sidebar={sidebar} subscriber={subscriber}/>} />
      </Route>

       <Route path='/search/:query' element={<PrivateRoute />} >
            <Route path='/search/:query' element={<SearchScreen />} />
      </Route>
   
       
        {/* <Route path="/" element={<Home  sidebar={sidebar} />} /> */}
        <Route path="/video/:categoryId/:videoId" element={<PrivateRoute />} >
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Route>
        {/* <Route path="/video/:categoryId/:videoId" element={<Video />} /> */}
      </Routes>
    </div>
  );
};

export default App;
