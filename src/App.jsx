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
  const [produkte, setProdukte] = useState([
    {
      produktId: 1,
      name: "Pinkus Alt",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Pinkus Alt.jpg",
    },
    {
      produktId: 2,
      name: "Franziskaner Alkoholfrei",
      bestand: 0,
      preis: 1.5,
      aktiv: true,
      bild: "Franziskaner Alkoholfrei.jpg",
    },
    {
      produktId: 3,
      name: "Franziskaner Weizen",
      bestand: 0,
      preis: 1.5,
      aktiv: true,
      bild: "Franziskaner Weizen.jpg",
    },
    {
      produktId: 4,
      name: "Früh Kölsch",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Fruh Kolsch.jpg",
    },
    {
      produktId: 5,
      name: "Beck's",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Becks.jpg",
    },
    {
      produktId: 6,
      name: "Bitburger Alkoholfrei",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Bitburger alkoholfrei.jpg",
    },
    {
      produktId: 7,
      name: "Bitburger",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Bitburger.jpg",
    },
    {
      produktId: 8,
      name: "Veltins",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Veltins.jpg",
    },
    {
      produktId: 9,
      name: "Hansa",
      bestand: 0,
      preis: 1.0,
      aktiv: true,
      bild: "Hansa.jpg",
    },
    {
      produktId: 10,
      name: "Tyskie",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Tyskie.jpg",
    },
    {
      produktId: 11,
      name: "Gösser Radler",
      bestand: 0,
      preis: 1.5,
      aktiv: true,
      bild: "Gosser Radler.jpg",
    },
    {
      produktId: 12,
      name: "Vitamalz",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Vitamalz.jpg",
    },
    {
      produktId: 13,
      name: "Club Mate",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Club Mate 20er.jpg",
    },
    {
      produktId: 14,
      name: "Coca Cola",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Coca Cola.jpg",
    },
    {
      produktId: 15,
      name: "Cocal Cola Light",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Coca Cola Light.jpg",
    },
    {
      produktId: 16,
      name: "Fanta",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Fanta.jpg",
    },
    {
      produktId: 17,
      name: "Mezzo Mix",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Mezzo Mix.jpg",
    },
    {
      produktId: 18,
      name: "Sprite",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Sprite.jpg",
    },
    {
      produktId: 19,
      name: "Wasser Classic",
      bestand: 0,
      preis: 0.9,
      aktiv: true,
      bild: "Wasser Classic blau.jpg",
    },
    {
      produktId: 20,
      name: "Wasser Medium",
      bestand: 0,
      preis: 0.9,
      aktiv: true,
      bild: "Wasser Medium grun.jpg",
    },
    {
      produktId: 21,
      name: "Fassbrause Maracuja",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Maracuja 24er.jpg",
    },
    {
      produktId: 22,
      name: "Fassbrause Rhabarber",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Rhababer 24er.jpg",
    },
    {
      produktId: 23,
      name: "Fassbrause Zitrone",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Zitrone 24er.jpg",
    },
    {
      produktId: 24,
      name: "Fassbrause Holunder",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Holunder 24er.jpg",
    },
    {
      produktId: 25,
      name: "Fassbrause Orange",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Orange 24er.jpg",
    },
    {
      produktId: 31,
      name: "Schokoriegel",
      bestand: 0,
      preis: 0.8,
      aktiv: true,
      bild: "Andere Schokoriegel.jpg",
    },
    {
      produktId: 32,
      name: "Chips",
      bestand: 0,
      preis: 2.5,
      aktiv: true,
      bild: "Funny Frisch Chips.jpg",
    },
    {
      produktId: 33,
      name: "Pizza",
      bestand: 0,
      preis: 3.0,
      aktiv: true,
      bild: "Pizza.jpg",
    },
  ]);
  const [geld, setGeld] = useState(45.0);

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
    if (localStorage.getItem("bardienst")) {
      return JSON.parse(localStorage.getItem("bardienst"));
    } else {
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
    if (sessionStorage.getItem("obk")) {
      return JSON.parse(sessionStorage.getItem("obk"));
    } else {
      return false;
    }
  });


  useEffect(() => {
    localStorage.setItem("bardienst", JSON.stringify(bardienst));
    sessionStorage.setItem("obk", JSON.stringify(obk));
  }, [bardienst, obk]);

  return (
    <BardienstContext.Provider value={[bardienst, setBardienst]}>
      <GeldContext.Provider value={[geld, setGeld]}>
        <ObkContext.Provider value={[obk, setObk]}>
          <Router>
            <Header />
            <Routes>
              <Route path="/obk/*" element={<ObkSeite />} />
              <Route exact path="/" element={<Login />} />
              <Route path="/barliste" element={<Barliste props={produkte} />} />
            </Routes>
          </Router>
        </ObkContext.Provider>
      </GeldContext.Provider>
    </BardienstContext.Provider>
  );
}

export default App;
export { BardienstContext, GeldContext, ObkContext };
