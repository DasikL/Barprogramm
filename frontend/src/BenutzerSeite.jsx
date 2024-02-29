import { useEffect, useState } from "react";
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
    if (window.confirm("Benutzer wirklich löschen?")) {
      fetch(
        "http://localhost:8080/api/v1/benutzer/" +
          singleBenutzer.zimmer +
          "/" +
          singleBenutzer.name,
        {
          method: "DELETE",
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      navigate("benutzer");
    }
    e.preventDefault();
  }

  function suchen(e) {
    let input, filter, div, a, i, txtValue;
    input = e.target.value;
    filter = input.toUpperCase();
    div = document.getElementsByTagName("tbody")[0];
    div = div.getElementsByTagName("tr");
    for (i = 0; i < div.length; i++) {
      a = div[i].getElementsByTagName("td");
      for (let j = 0; j < a.length; j++) {
        txtValue = a[j].textContent || a[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          div[i].style.display = "";
          break;
        } else {
          div[i].style.display = "none";
        }
      }
    }
  }

  if (benutzerSelected) {
    return (
      <>
        <div className="container">
          <div className="hstack gap-3">
            <h1>
              {singleBenutzer.name} {singleBenutzer.zimmer}
            </h1>
            <button
              onClick={() => setBenutzerSelected(false)}
              className="btn btn-primary ms-auto"
            >
              Zurück
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Uhrzeit</th>
                <th scope="col">Differenz</th>
              </tr>
            </thead>
            <tbody>
              {singleBenutzer.bardienste.map((bardienst) => (
                <tr key={bardienst.id.timestamp}>
                  <td>{bardienst.datum}</td>
                  <td>{bardienst.uhrzeit}</td>
                  <td>{euro.format(bardienst.differenz)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#löschenModal"
          >
            Benutzer löschen
          </button>
        </div>
        <div
          className="modal fade"
          id="löschenModal"
          tabIndex="-1"
          aria-labelledby="löschenModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="löschenModalLabel">
                  Benutzer löschen
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Sind Sie sicher, dass Sie den Benutzer löschen möchten?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={(e) => löschen(e)}
                  data-bs-dismiss="modal"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container">
        <h1>Benutzerseite</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="suchleiste"
            placeholder="suchen"
            onChange={(e) => suchen(e)}
          />
          <label htmlFor="suchleiste">suchen</label>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Zimmer</th>
            </tr>
          </thead>
          <tbody>
            {benutzer.map((benutzer) => (
              <tr
                key={benutzer.id.timestamp}
                onClick={() => showBenutzer(benutzer)}
                role="button"
              >
                <td className="" scope="row">
                  {benutzer.name}
                </td>
                <td className="">{benutzer.zimmer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Benutzerseite;
