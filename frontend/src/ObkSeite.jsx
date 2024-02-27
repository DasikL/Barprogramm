import React from "react";
import { useNavigate } from "react-router-dom";
import { ObkContext } from "./App";
import ProduktSeite from "./ProduktSeite";
import BenutzerSeite from "./BenutzerSeite";
import BardienstSeite from "./BardienstSeite";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function ObkSeite() {
  const navigate = useNavigate();
  const obk = React.useContext(ObkContext);

  React.useEffect(() => {
    if (obk[0] === false) {
      navigate("/");
    }
  }, [navigate, obk]);

  function abmelden() {
    obk[1](false);
  }

  return (
    <div>
      <h1>ObkSeite</h1>
      <button onClick={() => navigate("produkt")}>Produkt</button>
      <button onClick={() => navigate("benutzer")}>Benutzer</button>
      <button onClick={() => navigate("bardienst")}>Bardienst</button>
      <button onClick={() => abmelden()}>Abmelden</button>
        <Routes>
          <Route path="/produkt" element={<ProduktSeite />} />
          <Route path="/benutzer" element={<BenutzerSeite />} />
          <Route path="/bardienst" element={<BardienstSeite />} />
        </Routes>
    </div>
  );
}
export default ObkSeite;
