import React, { useState } from "react";

function Header() {

  const [obk, setObk] = useState(false);
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
      alert("Login erfolgreich!");
    }
    setObk(isObk);
    e.preventDefault();
  }


  return (
    <div>
      <button>Login</button>
      <div>
      <button>OBK</button>
      
      <form onSubmit={(e) => handleSubmit(e)}>
      <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
      <input type="submit" value="Login"/>
      </form>
      </div>
    </div>
  );
}

export default Header;
