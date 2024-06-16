import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route,Navigate,Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import GoogleLoginButton from "./Components/Auth/Login/Login2";
import Register from "./Components/Auth/Register/Register";
import { useAuth } from "./contexts/authContext";
const App = () => {
  const {accesstoken} = useAuth()
  console.log(accesstoken);
  const PrivateRoute = () => {
    console.log(accesstoken ,"aa")
    if(accesstoken===""){
    console.log("Value",accesstoken);
    }
    return accesstoken!==""? 
      <>
         <Navbar setSidebar={setSidebar} /> 
        <Outlet />
      </> : <Navigate replace to='/login' />
  };
  const [sidebar, setSidebar] = useState(true);
  
  return (
    <div className="w-full h-screen flex flex-col">
     
      <Routes>
      <Route path="/login" element={<GoogleLoginButton />} />
      {/* <Route path="/register" element={<Register />} /> */}


      <Route path='/' element={<PrivateRoute />} >
            <Route path='/' element={<Home  sidebar={sidebar} />} />
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
