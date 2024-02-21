import React, { useState, useContext } from "react";
import { ObkContext } from "./App";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  const obk = useContext(ObkContext);
  const [password, setPassword] = useState("");

  async function checkOBK(){
    const response = await fetch("http://localhost:8080/api/v1/password",
    { method: "POST", mode: "cors", headers: { "Content-Type": "application/json"}, body: password})
    const data = await response.json();
    return data;

  }
  
  function handleSubmit(e){
    if(password === ""){
      alert("Bitte geben Sie das Passwort ein!");
      e.preventDefault();
      return;
    }
   const isObk = checkOBK();
    
    if(isObk){
      obk[1](true);
      navigate("/obk");
    }
    e.preventDefault();

  }


  return (
    <div>
      <div>
      <button onClick={() => {
        if(obk[0]){
          navigate("/obk");
        }
      }}>OBK</button>
      
      <form onSubmit={(e) => handleSubmit(e)}>
      <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
      <input type="submit" value="Login"/>
      </form>
      </div>
    </div>
  );
}

export default Header;
