import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, LogInContext } from "./App";

function Barliste(props) {
  let bardienst = useContext(UserContext);
  const navigate = useNavigate();

  const [anfangsbestand, setAnfangsbestang] = useState(() => {
    if (localStorage.getItem("bardienst")) {
      return JSON.parse(localStorage.getItem("bardienst")).anfangsbestand;
    } else {
      return {};
    }
  });
  const [endbestand, setEndbestand] = useState(() => {
    if (localStorage.getItem("bardienst")) {
      return JSON.parse(localStorage.getItem("bardienst")).endbestand;
    } else {
      return {};
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/");
    }
  }, []);

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
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
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
              value={anfangsbestand[item.produktId]}
              onChange={(e) => {
                if (e.target.value === item.bestand.toString()) {
                  e.target.style.color = "black";
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
              value={endbestand[item.produktId]}
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
