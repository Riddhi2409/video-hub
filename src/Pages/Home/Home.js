import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import './Home.css'
import { useFun } from "../../contexts/youtubeContext.js";

const Home = ({sidebar,subscriber}) => {

  const {category,setCategory}=useFun()
  
  return (
    <>
      <Sidebar setCategory={setCategory} sidebar={sidebar} category={category} subscriber={subscriber} />
      <div className={`container ${sidebar ? "" : " large-container"}`}>
        <Feed category={category}/>
      </div>
    </>
  );
};

export default Home;
