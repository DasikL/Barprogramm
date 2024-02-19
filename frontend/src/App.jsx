import React, { useState, useEffect, createContext } from "react";

import Barliste from "./Barliste";
import Login from "./Login";
import Header from "./Header";

const UserContext = createContext();
const LogInContext = createContext();

function App() {
  const [produkte, setProdukte] = useState([]);

  /*
    TODO:
    Damit die Differenzen der Zählungen in der Datenbank gespeichert werden können, muss ich noch eine neue Funktion
    im Backend schreiben, die die Differenz berechnet, dem Bardienst zuordnet und in die Datenbank speichert.
    
    */

  const [bardienst, setBardienst] = useState({
    name: "",
    zimmer: "",
    datum: "",
    uhrzeit: "",
    kommentar: "",
    anfangsbestand: {},
    endbestand: {},
  });


  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/produkt/aktive")
      .then((response) => response.json())
      .then((data) => {
        setProdukte(data);
      });
  }, [bardienst, loggedin]);

  return (
    <UserContext.Provider value={[bardienst,setBardienst]}>
      <LogInContext.Provider value={[loggedin, setLoggedin]}>
        <Header />
        {loggedin ? <Barliste props={produkte} /> : <Login />}
      </LogInContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext, LogInContext };
