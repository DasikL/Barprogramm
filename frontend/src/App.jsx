import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Barliste from "./Barliste";
import Login from "./Login";
import Header from "./Header";
import ObkSeite from "./ObkSeite";

const UserContext = createContext();
const LogInContext = createContext();
const ObkContext = createContext();

function App() {

  const [produkte, setProdukte] = useState([]);

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
  }, [bardienst, loggedin]);

  useEffect(() => {
    localStorage.setItem("bardienst", JSON.stringify(bardienst));
    sessionStorage.setItem("obk", JSON.stringify(obk));
  }, [bardienst, obk]);

  return (
    <UserContext.Provider value={[bardienst, setBardienst]}>
      <LogInContext.Provider value={[loggedin, setLoggedin]}>
        <ObkContext.Provider value={[obk, setObk]}>
          <Router>
            <Header />
            <Routes>
              <Route path="/obk" element={<ObkSeite />} />
              <Route exact path="/" element={<Login />} />
              <Route path="/barliste" element={<Barliste props={produkte}/>} />
            </Routes>
          </Router>
        </ObkContext.Provider>
      </LogInContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext, LogInContext, ObkContext };
