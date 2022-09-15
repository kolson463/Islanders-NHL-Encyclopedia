import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

const Redirect = () => {

    let navigate = useNavigate();
    let { comp_id } = useParams();
    let location = useLocation();
  
    let username = location.state.username;
  

  
  useEffect(() => {
    loadPage()
  }, []);

  function loadPage(){
    setTimeout(()=>{ }, "1000")
    console.log(comp_id)
    navigate("/player/" + comp_id, {state: {
        username: username
      }})
  }

  

  return (
    <div>Loading Comp Page</div>
  );
};

export default Redirect;


