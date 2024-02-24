import { useEffect, useState } from "react";

function BardiensSeite() {
  const [params, setParams] = useState({ month: 2, year: 2024 });
  const [bardienste, setBardienste] = useState([]);

  useEffect(() => {
    let url = new URL("http://localhost:8080/api/v1/bardienst/month");
    url.search = new URLSearchParams(params).toString();
    fetch(url, { Method: "GET" })
      .then((response) => response.json())
      .then((data) => setBardienste(data));
  }, [params]);

  function renderBestandWerte(item) {
    let bestand = [];
    for (const [key] of Object.entries(item.anfangsbestand)) {
      bestand.push(
        <>
          <td>{item.anfangsbestand[key]}</td>
          <td>{item.endbestand[key]}</td>
        </>
      );
    }
    return bestand;
  }

  function renderBestandHeader() {
    let header = [];
    if (bardienste.length === 0) {
      return header;
    }
    for (const [key] of Object.entries(bardienste[0].anfangsbestand)) {
      header.push(
        <>
          <th>{key}</th>
          <th>{key}</th>
        </>
      );
    }
    return header;
  }

  return (
    <div>
      <h1>Bardienst</h1>
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Uhrzeit</th>
            <th>Name</th>
            <th>Zimmer</th>
            {renderBestandHeader()}
          </tr>
        </thead>
        <tbody>
          {bardienste.map((item) => (
            <tr key={item.id.timestamp}>
              <td>{item.datum}</td>
              <td>{item.uhrzeit}</td>
              <td>{item.name}</td>
              <td>{item.zimmer}</td>
              {renderBestandWerte(item)}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => console.log(bardienste)}>Log</button>
    </div>
  );
}
export default BardiensSeite;
