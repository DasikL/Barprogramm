import { useEffect, useState } from "react";

function BardienstSeite() {
  const [params, setParams] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [bardienste, setBardienste] = useState([
    {
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
        "name": "David",
        "zimmer": "256",
        "datum": "2024-02-27",
        "uhrzeit": "20:00:03",
        "kommentar": "Guten Tag",
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
    }
]);
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
    }
  ]);
  const euro = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  
  function handleSearch(e) {
    e.preventDefault();
    let month = e.target[0].value;
    let year = month.split("-")[0];
    month = month.split("-")[1];
    setParams({ month: month, year: year });
  }

  function getCurrentMonth() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year + "-" + month;
  }

  function downloadCSV() {
    let csv =
      "Datum,Uhrzeit,Name,Zimmer,Kommentar,Differenz,Geld Anfang,Geld Ende";
    for (const [key] of Object.entries(produkte)) {
      let produkt = produkte[key];
      csv += `,${produkt.name} Anfang,${produkt.name} Ende`;
    }
    for (const [key] of Object.entries(bardienste)) {
      let item = bardienste[key];
      csv += `\n${item.datum},${item.uhrzeit},${item.name},${item.zimmer},${item.kommentar},${item.differenz},${item.geld[0]},${item.geld[1]}`;
      for (const [key] of Object.entries(produkte)) {
        let produkt = produkte[key];
        if (item.anfangsbestand[produkt.produktId] === undefined) {
          item.anfangsbestand[produkt.produktId] = 0;
          item.endbestand[produkt.produktId] = 0;
        }
        csv += `,${item.anfangsbestand[produkt.produktId]},${item.endbestand[produkt.produktId]}`;
      }
    }
    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "bardienst.csv";
    hiddenElement.click();
  }
  return (
    <div className="container">
      <h1>Bardienste</h1>
      <form onSubmit={(e) => handleSearch(e)}>
        <div className="input-group mb-3">
          <input
            type="month"
            className="form-control"
            defaultValue={getCurrentMonth()}
            id="month"
          />
          <button type="submit" className="btn btn-primary">
            Suchen
          </button>
        </div>
      </form>
      <div>
        <table className="table table-sm table-bordered">
          <thead className="text-truncate">
            <tr>
              <th>Datum</th>
              <th>Uhrzeit</th>
              <th>Name</th>
              <th>Zimmer</th>
              <th>Kommentar</th>
              <th>Differenz</th>
              <th colSpan={2}>Geld</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Anfang</th>
              <th>Ende</th>
            </tr>
          </thead>
          <tbody>
            {bardienste.map((item) => (
              <tr key={item.datum + item.uhrzeit}>
                <td>{item.datum}</td>
                <td>{item.uhrzeit}</td>
                <td>{item.name}</td>
                <td>{item.zimmer}</td>
                <td>{item.kommentar}</td>
                <td>{euro.format(item.differenz)}</td>
                <td>{euro.format(item.geld[0])}</td>
                <td>{euro.format(item.geld[1])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary btn-lg" onClick={() => downloadCSV()}>CSV Datei herunterladen</button>
    </div>
  );
}
export default BardienstSeite;
