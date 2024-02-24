import React from "react";
import { useNavigate } from "react-router-dom";
import { ObkContext } from "./App"; 
import ProduktSeite from "./ProduktSeite";
import BenutzerSeite from "./BenutzerSeite";
import BardienstSeite from "./BardienstSeite";


function ObkSeite() {

  const navigate = useNavigate();
  const obk = React.useContext(ObkContext);

  React.useEffect(() => {
    if (obk[0] === false) {
      navigate("/");
    }
  },[navigate, obk]) 

  function abmelden() {
    obk[1](false);
  }


  return (
    <div>
      <h1>ObkSeite</h1>
    <button onClick={() => abmelden()}>Abmelden</button>
    <BardienstSeite />
    {// Benutzerseiten mit Bardiensten und Gewinn und Verlust
    // Seite um Nachfrage zu prognostizieren, sowie aufgrund der Prognose eine Bestellung vorgeschlagen bekommt
    }
    </div>
  );
}
export default ObkSeite;
