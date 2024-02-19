import { useContext, useState } from "react";
import { UserContext, LogInContext } from "./App";

function Barliste(props) {
  let bardienst = useContext(UserContext);

  const [anfangsbestand, setAnfangsbestang] = useState({});
  const [endbestand, setEndbestand] = useState({});

  let loggedin = useContext(LogInContext);

  const upload = (e) => {
    if (
      Object.keys(anfangsbestand).length !== props.props.length ||
      Object.keys(endbestand).length !== props.props.length
    ) {
      alert("Bitte füllen Sie alle Felder aus!");
      e.preventDefault();
      return;
    } else {
      fetch("http://localhost:8080/api/v1/bardienst/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bardienst[0]),
      });
      bardienst[1]((prev) => ({
        ...prev,
        anfangsbestand: {},
        endbestand: {},
        kommentar: "",
        name: "",
        zimmer: "",
        datum: "",
        uhrzeit: "",
      }));
      loggedin[1](false);
      e.preventDefault();
    }
  };

  return (
    <div>
      <h2>Barliste</h2>
      {props.props.map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>Preis: {item.preis} €</p>
            <p>Anfangsbestand:</p>
            <input
              type="number"
              onChange={(e) => {
                if (e.target.value === item.bestand.toString()) {
                  e.target.style.color = "lime";
                } else {
                  e.target.style.color = "red";
                }
                setAnfangsbestang((prev) => ({
                  ...prev,
                  [item.produktId]: e.target.value,
                }));
                setAnfangsbestang((prev) => ({
                  ...prev,
                  [item.produktId]: e.target.value,
                }));

                bardienst[1]((prev) => ({
                  ...prev,
                  anfangsbestand: anfangsbestand,
                }));
              }}
            />
            <p>Endbestand:</p>
            <input
              type="number"
              onChange={(e) => {
                setEndbestand((prev) => ({
                  ...prev,
                  [item.produktId]: e.target.value,
                }));
                bardienst[1]((prev) => ({ ...prev, endbestand: endbestand }));
              }}
            />
          </div>
        );
      })}
      <button onClick={(e) => upload(e)}>Bardienst beenden</button>
    </div>
  );
}
export default Barliste;
