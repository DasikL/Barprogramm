import { useContext, useState, useEffect } from "react";
import { BardienstContext } from "./App";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

function Login() {
  const bardienst = useContext(BardienstContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [znummer, setZnummer] = useState("");

  const Zimmer = [
    "001",
    "002",
    "003",
    "004",
    "005",
    "050",
    "051",
    "052",
    "053",
    "054",
    "055",
    "056",
    "057",
    "058",
    "059",
    "060",
    "100",
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "111",
    "112",
    "113",
    "150",
    "151",
    "152",
    "153",
    "154",
    "155",
    "156",
    "157",
    "158",
    "159",
    "160",
    "200",
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "209",
    "210",
    "211",
    "212",
    "213",
    "250",
    "251",
    "252",
    "253",
    "254",
    "255",
    "256",
    "257",
    "258",
    "259",
    "260",
    "300",
    "301",
    "302",
    "303",
    "304",
    "305",
    "306",
    "307",
    "308",
    "309",
    "310",
    "311",
    "312",
    "313",
    "350",
    "351",
    "352",
    "353",
    "354",
    "355",
    "356",
    "357",
    "358",
    "359",
    "360",
  ];

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/barliste");
    }
  }, []);

  async function checkBenutzer(zimmernummer) {
    const response = await fetch(
      "http://localhost:8080/api/v1/benutzer/check/" + zimmernummer + "/" + name,
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
    const exists = await checkBenutzer(znummer);

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
  }

  function ersterBardienst() {
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
  }

  async function umgezogen() {
    let alteNummer = prompt("Bitte geben Sie die alte Zimmernummer ein");
    if (Zimmer.includes(alteNummer)) {
      const exists = await checkBenutzer(alteNummer);
      if (exists) {
        fetch(
          "http://localhost:8080/api/v1/benutzer/update/" +
            znummer +
            "/" +
            name +
            "/" +
            alteNummer,
          {
            method: "PUT",
          },
        );
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
    } else {
      alert("Bitte geben Sie eine gültige Zimmernummer ein!");
    }
  }

  // Idee: Videoerklärung für den Benutzer beim ersten Bardienst

  return (
    <>
      <div className="container">
        <div className="position-absolute top-50 start-50 translate-middle">
          <h1 className="text-center">Login</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="znummer" className="form-label">
                Zimmernummer:
              </label>
              <input
                type="number"
                id="znummer"
                className="form-control"
                onChange={(e) => setZnummer(e.target.value)}
              />
            </div>
            <div className="row mb-3">
              <input
                type="submit"
                value="Bardienst beginnen"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modal"
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className="modal fade"
        id="modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalLabel">
                Benutzer nicht gefunden
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Du bist noch nicht im System drin, ist das dein erster Bardienst,
              oder bist du umgezogen?
            </div>
            <div className="modal-footer ">
              <button
                type="button"
                className="btn btn-primary"
                onClick={ersterBardienst}
                data-bs-dismiss="modal"
              >
                Es ist mein erster Bardienst
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={umgezogen}
                data-bs-dismiss="modal"
              >
                Ich bin umgezogen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
