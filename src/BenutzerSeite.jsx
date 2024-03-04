import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Benutzerseite() {
  //alle Benutzer anzeigen, und man kann nach Benutzer suchen
  //Benutzer anklicken und dann kann man die Bardienste sehen und den Benutzer bearbeiten

  const navigate = useNavigate();
  const [benutzer, setBenutzer] = useState([
    {
        "id": {
            "timestamp": 1709030198,
            "date": "2024-02-27T10:36:38.000+00:00"
        },
        "name": "David",
        "zimmer": "256",
        "bardienste": [
            {
                "id": {
                    "timestamp": 1709030251,
                    "date": "2024-02-27T10:37:31.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-02-27",
                "uhrzeit": "10:36:57",
                "kommentar": null,
                "geld": [
                    155.0,
                    140.0
                ],
                "differenz": -48.0,
                "anfangsbestand": {
                    "2": 5
                },
                "endbestand": {
                    "2": 3
                }
            },
            {
                "id": {
                    "timestamp": 1709030315,
                    "date": "2024-02-27T10:38:35.000+00:00"
                },
                "name": "David",
                "zimmer": "105",
                "datum": "2024-02-27",
                "uhrzeit": "10:37:42",
                "kommentar": null,
                "geld": [
                    140.0,
                    130.0
                ],
                "differenz": -25.0,
                "anfangsbestand": {
                    "2": 4
                },
                "endbestand": {
                    "2": 3
                }
            },
            {
                "id": {
                    "timestamp": 1709030584,
                    "date": "2024-02-27T10:43:04.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-02-27",
                "uhrzeit": "10:42:37",
                "kommentar": "Test",
                "geld": [
                    130.0,
                    150.0
                ],
                "differenz": 12.5,
                "anfangsbestand": {
                    "2": 3
                },
                "endbestand": {
                    "2": 2
                }
            },
            {
                "id": {
                    "timestamp": 1709031949,
                    "date": "2024-02-27T11:05:49.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-02-27",
                "uhrzeit": "11:05:30",
                "kommentar": null,
                "geld": [
                    150.0,
                    160.0
                ],
                "differenz": -18.5,
                "anfangsbestand": {
                    "2": 5
                },
                "endbestand": {
                    "2": 3
                }
            },
            {
                "id": {
                    "timestamp": 1709056639,
                    "date": "2024-02-27T17:57:19.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-02-27",
                "uhrzeit": "17:56:56",
                "kommentar": null,
                "geld": [
                    150.0,
                    156.0
                ],
                "differenz": -9.0,
                "anfangsbestand": {
                    "2": 5
                },
                "endbestand": {
                    "2": 4
                }
            },
            {
                "id": {
                    "timestamp": 1709062341,
                    "date": "2024-02-27T19:32:21.000+00:00"
                },
                "name": "David",
                "zimmer": "105",
                "datum": "2024-02-27",
                "uhrzeit": "19:30:07",
                "kommentar": null,
                "geld": [
                    105.0,
                    111.0
                ],
                "differenz": -72.0,
                "anfangsbestand": {
                    "2": 6
                },
                "endbestand": {
                    "2": 1
                }
            },
            {
                "id": {
                    "timestamp": 1709064047,
                    "date": "2024-02-27T20:00:47.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-02-27",
                "uhrzeit": "20:00:03",
                "kommentar": "Heyyyyy ;)",
                "geld": [
                    105.0,
                    110.0
                ],
                "differenz": 3.5,
                "anfangsbestand": {
                    "2": 5
                },
                "endbestand": {
                    "2": 5
                }
            },
            {
                "id": {
                    "timestamp": 1709154861,
                    "date": "2024-02-28T21:14:21.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-02-28",
                "uhrzeit": "12:07:23",
                "kommentar": null,
                "geld": [
                    150.0,
                    160.0
                ],
                "differenz": -176.5,
                "anfangsbestand": {
                    "1": 21,
                    "2": 55,
                    "3": 53,
                    "4": 69
                },
                "endbestand": {
                    "1": 6,
                    "2": 3,
                    "3": 11,
                    "4": 46
                }
            },
            {
                "id": {
                    "timestamp": 1709456552,
                    "date": "2024-03-03T09:02:32.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-03-02",
                "uhrzeit": "18:40:03",
                "kommentar": null,
                "geld": [
                    50.0,
                    49.0
                ],
                "differenz": -1.2,
                "anfangsbestand": {
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 0,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 0,
                    "11": 0,
                    "12": 0,
                    "13": 0,
                    "14": 0,
                    "15": 0,
                    "16": 0,
                    "17": 0,
                    "18": 0,
                    "19": 0,
                    "20": 0,
                    "21": 0,
                    "22": 0,
                    "23": 0,
                    "24": 0,
                    "25": 0,
                    "26": 0,
                    "27": 0,
                    "28": 0,
                    "29": 0,
                    "30": 0,
                    "31": 0,
                    "32": 0,
                    "33": 0,
                    "34": 5,
                    "35": 4,
                    "36": 0,
                    "37": 0
                },
                "endbestand": {
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 0,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 0,
                    "11": 0,
                    "12": 0,
                    "13": 0,
                    "14": 0,
                    "15": 0,
                    "16": 0,
                    "17": 0,
                    "18": 0,
                    "19": 0,
                    "20": 0,
                    "21": 0,
                    "22": 0,
                    "23": 0,
                    "24": 0,
                    "25": 0,
                    "26": 0,
                    "27": 0,
                    "28": 0,
                    "29": 0,
                    "30": 0,
                    "31": 0,
                    "32": 0,
                    "33": 0,
                    "34": 3,
                    "35": 14,
                    "36": 0,
                    "37": 0
                }
            },
            {
                "id": {
                    "timestamp": 1709479563,
                    "date": "2024-03-03T15:26:03.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-03-03",
                "uhrzeit": "09:27:45",
                "kommentar": null,
                "geld": [
                    50.0,
                    49.0
                ],
                "differenz": -37.7,
                "anfangsbestand": {
                    "1": 12,
                    "2": 22
                },
                "endbestand": {
                    "1": 2,
                    "2": 3
                }
            },
            {
                "id": {
                    "timestamp": 1709486899,
                    "date": "2024-03-03T17:28:19.000+00:00"
                },
                "name": "David",
                "zimmer": "256",
                "datum": "2024-03-03",
                "uhrzeit": "17:27:39",
                "kommentar": null,
                "geld": [
                    42.0,
                    45.0
                ],
                "differenz": 3.0,
                "anfangsbestand": {
                    "1": 1,
                    "2": 1
                },
                "endbestand": {
                    "1": 1,
                    "2": 1
                }
            },
        ]
    }
]);
  const [benutzerSelected, setBenutzerSelected] = useState(false);
  const [singleBenutzer, setSingleBenutzer] = useState({});

  const euro = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  function showBenutzer(benutzer) {
    setBenutzerSelected(true);
    setSingleBenutzer(benutzer);
  }

  function löschen(e) {
    setBenutzerSelected(false);
    setSingleBenutzer({});
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
