import { useContext, useState, useEffect } from "react";
import { BardienstContext } from "./App";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

function Login() {
  const bardienst = useContext(BardienstContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [znummer, setZnummer] = useState("");

  const Zimmer = ["001", "002", "003", "004", "005",
    "050", "051", "052", "053", "054", "055", "056", "057", "058", "059", "060",
    "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113",
    "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160",
    "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213",
    "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260",
    "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313",
    "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360"];

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/barliste");
    }
  }, []);


  async function checkBenutzer() {
    const response = await fetch(
      "http://localhost:8080/api/v1/benutzer/check/" + znummer + "/" + name,
      { method: "GET" },
    );
    const data = await response.json();
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || znummer === "") {
      alert("Bitte füllen Sie alle Felder aus!");
      return;
    }
    if (!Zimmer.includes(znummer)) {
      alert("Bitte geben Sie eine gültige Zimmernummer ein!");
      return;
    }
    const exists = await checkBenutzer();

    if (exists) {
      const date = new Date();
      bardienst[1]((prev) => ({
        name: name,
        zimmer: znummer,
        datum: date.toISOString().split("T")[0],
        uhrzeit: date.toISOString().split("T")[1].split(".")[0],
        geld: [],
        anfangsbestand: {},
        endbestand: {},
      }));
      localStorage.setItem("loggedIn", true);
      navigate("/barliste");
    }
    else {
      confirmAlert({
        title: 'Benutzer nicht gefunden',
        message: 'Wähle die Option aus, die auf dich zutrifft.',
        buttons: [
          {
            label: 'Es ist mein erster Bardienst',
            onClick: () => {
              fetch("http://localhost:8080/api/v1/benutzer/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, zimmer: znummer }),
              });
              const date = new Date();
              bardienst[1]((prev) => ({
                name: name,
                zimmer: znummer,
                datum: date.toISOString().split("T")[0],
                uhrzeit: date.toISOString().split("T")[1].split(".")[0],
                geld: [],
                anfangsbestand: {},
                endbestand: {},
              }));

              localStorage.setItem("loggedIn", true);
              navigate("/barliste");
            },
          },
          {
            label: 'Ich bin umgezogen',
            onClick: () => {
              let alteNummer = prompt("Bitte geben Sie die alte Zimmernummer ein");
              if (Zimmer.includes(alteNummer)) {
                fetch("http://localhost:8080/api/v1/benutzer/update/" + znummer + "/" + name + "/" + alteNummer, {
                  method: "PUT",
                });
                const date = new Date();
                bardienst[1]((prev) => ({
                  name: name,
                  zimmer: znummer,
                  datum: date.toISOString().split("T")[0],
                  uhrzeit: date.toISOString().split("T")[1].split(".")[0],
                  geld: [],
                  anfangsbestand: {},
                  endbestand: {},
                }));
                localStorage.setItem("loggedIn", true);
                navigate("/barliste");
              }
              else {
                alert("Bitte geben Sie eine gültige Zimmernummer ein!");
              }


            }
          }
        ]
      }
      );
    }

      // TODO: Fragen ob es der erste Bardienst ist und wenn ja User in die Datenbank eintragen und alten Zimmerbesitzer löschen
      // Idee: Videoerklärung für den Benutzer beim ersten Bardienst
    }

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="znummer">Zimmernummer:</label>
          <input
            type="number"
            id="znummer"
            onChange={(e) => setZnummer(e.target.value)}
          />
          <input type="submit" value="Bardienst beginnen" />
        </form>
      </div>
    );
  }
  export default Login;
