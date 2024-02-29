import { useEffect, useState } from "react";

function BardienstSeite() {
  const [params, setParams] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [bardienste, setBardienste] = useState([]);
  const [produkte, setProdukte] = useState([]);
  const euro = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    let url = new URL("http://localhost:8080/api/v1/bardienst/month");
    url.search = new URLSearchParams(params).toString();
    fetch(url, { Method: "GET" })
      .then((response) => response.json())
      .then((data) => setBardienste(data));

    fetch("http://localhost:8080/api/v1/produkt", { Method: "GET" })
      .then((response) => response.json())
      .then((data) => setProdukte(data));
  }, [params]);

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
              <tr key={item.id.timestamp}>
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
