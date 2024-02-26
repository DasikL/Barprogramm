import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

function Benutzerseite() {
  //alle Benutzer anzeigen, und man kann nach Benutzer suchen
  //Benutzer anklicken und dann kann man die Bardienste sehen und den Benutzer bearbeiten

  const [benutzer, setBenutzer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/benutzer")
      .then((response) => response.json())
      .then((data) => {
        setBenutzer(data);
      });
  }, []);

  function showBenutzer(benutzer) {
    console.log(benutzer);
  }

  return (
    <div>
      <h1>Benutzerseite</h1>
      <input type="text" placeholder="Benutzer suchen" />
      <button>Suchen</button>
      <ul>
        {benutzer.map((benutzer) => (
          <li key={benutzer.zimmer} onClick={() => showBenutzer(benutzer)}>
            {benutzer.name} {benutzer.zimmer}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Benutzerseite;
