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


  return (
        <Routes>
          <Route path="/produkt" element={<ProduktSeite />} />
          <Route path="/benutzer" element={<BenutzerSeite />} />
          <Route path="/bardienst" element={<BardienstSeite />} />
        </Routes>
  );
}
export default ObkSeite;
