import React from "react";
import { useNavigate } from "react-router-dom";
import { ObkContext } from "./App"; 
import ProduktSeite from "./ProduktSeite";


function ObkSeite() {

  const navigate = useNavigate();
  const obk = React.useContext(ObkContext);

  React.useEffect(() => {
    if (!obk[0]) {
      navigate("/");
    }
  }) 


  return (
    <div>
      <h1>ObkSeite</h1>
    <ProduktSeite />
     // Benutzerseiten mit Bardiensten und Gewinn und Verlust
    // Seite um Nachfrage zu prognostizieren, sowie aufgrund der Prognose eine Bestellung vorgeschlagen bekommt
    </div>
  );
}
export default ObkSeite;
