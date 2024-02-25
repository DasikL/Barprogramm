import { useEffect, useState } from "react";

//TODO: Maybe implement a way to get Bardienste from a single User

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
  let vorherigeBestaende = undefined;

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

  function renderBestandWerte(item) {
    let bestand = [];

    for (const [key] of Object.entries(produkte)) {
      let produkt = produkte[key];
      let bestandAnfang = item.anfangsbestand[produkt.produktId];
      let bestandEnde = item.endbestand[produkt.produktId];
      if (vorherigeBestaende === undefined) {
        bestand.push(
          <>
            <td>{bestandAnfang}</td>
            <td>{bestandEnde}</td>
          </>,
        );
      } else {
        let vorherigerBestand = vorherigeBestaende[produkt.produktId];
        let differenz = bestandAnfang - vorherigerBestand;
        if (differenz !== 0) {
          bestand.push(
            <>
              <td style={{ color: "red" }}>{bestandAnfang}</td>
              <td>{bestandEnde}</td>
            </>,
          );
        } else {
          bestand.push(
            <>
              <td>{bestandAnfang}</td>
              <td>{bestandEnde}</td>
            </>,
          );
        }
      }
    }
    vorherigeBestaende = item.endbestand;
    return bestand;
  }

  function renderBestandHeader() {
    let header = [];
    for (const [key] of Object.entries(produkte)) {
      header.push(
        <>
          <th colSpan="2">{produkte[key].name}</th>
        </>,
      );
    }
    return header;
  }

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

  return (
    <div>
      <h1>Bardienst</h1>
      <form onSubmit={(e) => handleSearch(e)}>
        <input type="month" defaultValue={getCurrentMonth()} id="month" />
        <button type="submit">Suchen</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Name</th>
            <th>Zimmer</th>
            <th>Differenz</th>
            <th colSpan="2">Geld</th>
            {renderBestandHeader()}
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Anfangsbestand</th>
            <th>Endbestand</th>
            {produkte.length !== 0 ? (
              produkte.map(() => (
                <>
                  <th>Anfangsbestand</th>
                  <th>Endbestand</th>
                </>
              ))
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {bardienste.map((item) => (
            <tr key={item.id.timestamp}>
              <td>{item.datum}</td>
              <td>{item.uhrzeit}</td>
              <td>{item.name}</td>
              <td>{item.zimmer}</td>
              <td>{euro.format(item.differenz)}</td>
              <td>{euro.format(item.geld[0])}</td>
              <td>{euro.format(item.geld[1])}</td>
              {renderBestandWerte(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BardienstSeite;
