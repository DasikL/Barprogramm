import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as bootstrap from "bootstrap";

import Barliste from "./Barliste";
import Login from "./Login";
import Header from "./Header";
import ObkSeite from "./ObkSeite";

import "./App.scss";

const BardienstContext = createContext();
const GeldContext = createContext();
const ObkContext = createContext();

function App() {

  const [produkte, setProdukte] = useState([]);
  const [geld, setGeld] = useState(0.0);
    

  /*
    TODO:
    Damit die Differenzen der Zählungen in der Datenbank gespeichert werden können, muss ich noch eine neue Funktion
    im Backend schreiben, die die Differenz berechnet, dem Bardienst zuordnet und in die Datenbank speichert.

    TODO:
    Zurück-Button deaktivieren
    Bei Reload nicht ausloggen
    Kommentarfeld
    */

  const [bardienst, setBardienst] = useState(() => {
    if(localStorage.getItem("bardienst")){
      return JSON.parse(localStorage.getItem("bardienst"));
    }
    else{
      return {
        name: "",
        zimmer: "",
        datum: "",
        uhrzeit: "",
        kommentar: "",
        geld: [],
        differenz: 0,
        anfangsbestand: {},
        endbestand: {},
      };
    }
  });

  const [loggedin, setLoggedin] = useState(false);

  const [obk, setObk] = useState(() => {
    if(sessionStorage.getItem("obk")){
      return JSON.parse(sessionStorage.getItem("obk"));
    }
    else{
      return false;
    }
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/produkt/aktive")
      .then((response) => response.json())
      .then((data) => {
        setProdukte(data);
      });

    fetch("http://localhost:8080/api/v1/geld", {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        setGeld(data);
      });
      
  }, [bardienst, loggedin]);

  useEffect(() => {
    localStorage.setItem("bardienst", JSON.stringify(bardienst));
    sessionStorage.setItem("obk", JSON.stringify(obk));
  }, [bardienst, obk]);

  return (
    <BardienstContext.Provider value={[bardienst, setBardienst]}>
      <GeldContext.Provider value={[geld, setGeld]}>
        <ObkContext.Provider value={[obk, setObk]}>
          <Router>
            <Header/>
            <Routes>
              <Route path="/obk/*" element={<ObkSeite />} />
              <Route exact path="/" element={<Login />} />
              <Route path="/barliste" element={<Barliste props={produkte}/>} />
            </Routes>
          </Router>
        </ObkContext.Provider>
      </GeldContext.Provider>
    </BardienstContext.Provider>
  );
}

export default App;
export { BardienstContext, GeldContext, ObkContext };
