import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";

function Benutzerseite() {
  //alle Benutzer anzeigen, und man kann nach Benutzer suchen
  //Benutzer anklicken und dann kann man die Bardienste sehen und den Benutzer bearbeiten

  const navigate = useNavigate();
  const [benutzer, setBenutzer] = useState([]);
  const [benutzerSelected, setBenutzerSelected] = useState(false);
  const [singleBenutzer, setSingleBenutzer] = useState({});

  const euro = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/benutzer")
      .then((response) => response.json())
      .then((data) => {
        setBenutzer(data);
      });
  }, []);

  function showBenutzer(benutzer) {
    setBenutzerSelected(true);
    setSingleBenutzer(benutzer);
  }

  function löschen(e) {
    if(window.confirm("Benutzer wirklich löschen?")){
      fetch("http://localhost:8080/api/v1/benutzer/" + singleBenutzer.zimmer +"/"+ singleBenutzer.name, {
        method: "DELETE",
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
      navigate("benutzer");
    }
    e.preventDefault();
  }


  if (benutzerSelected) {
    return (
      <div>
        <button onClick={() => setBenutzerSelected(false)}>Zurück</button>
        <h1>
          {singleBenutzer.name} {singleBenutzer.zimmer}
        </h1>
        <ul>
          {singleBenutzer.bardienste.map((bardienst) => (
            <li key={bardienst.id.timestamp}>
              {bardienst.datum} {bardienst.uhrzeit}{" "}
              {euro.format(bardienst.differenz)}
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => löschen(e)}>
          <input type="submit" value="Benutzer löschen" />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Benutzerseite</h1>
        <input type="text" placeholder="Benutzer suchen" />
        <button>Suchen</button>
        <ul>
          {benutzer.map((benutzer) => (
            <li
              key={benutzer.id.timestamp}
              onClick={() => showBenutzer(benutzer)}
            >
              {benutzer.name} {benutzer.zimmer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Benutzerseite;
