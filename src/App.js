import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route,Navigate,Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import { useAuth } from "./contexts/authContext";
const App = () => {
  const { userLoggedIn } = useAuth()
  const PrivateRoute = () => {
    return userLoggedIn? 
      <>
         <Navbar setSidebar={setSidebar} /> 
        <Outlet />
      </> : <Navigate replace to='/login' />
  };
  const [sidebar, setSidebar] = useState(true);
  
  return (
    <div className="w-full h-screen flex flex-col">
     
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route path='/' element={<PrivateRoute/>} >
            <Route path='/' element={<Home  sidebar={sidebar} />} />
      </Route>
   
       
        {/* <Route path="/" element={<Home  sidebar={sidebar} />} /> */}
        <Route path="/video/:categoryId/:videoId" element={<PrivateRoute/>} >
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Route>
        {/* <Route path="/video/:categoryId/:videoId" element={<Video />} /> */}
      </Routes>
    </div>
  );
};

export default App;
