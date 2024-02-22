import { useEffect, useState } from "react";

function ProduktSeite() {
  const [produkte, setProdukte] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/produkt")
      .then((response) => response.json())
      .then((data) => setProdukte(data));
  }, []);



  function ändern(e) {
    produkte.forEach((produkt) => {
      fetch("http://localhost:8080/api/v1/produkt/change", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produkt),
      });
    });
    alert("Änderungen gespeichert");
    e.preventDefault();
  }

  function bestand(e) {
    setProdukte(produkte.map((produkt) => {
      if (produkt.produktId === parseInt(e.target.id.substring(7))) {
        return {...produkt, bestand: parseInt(e.target.value)};
      }
      return produkt;
    }
    ));
  }
  function preis(e) {
    setProdukte(produkte.map((produkt) => {
      if (produkt.produktId === parseInt(e.target.id.substring(5))) {
        return {...produkt, preis: parseInt(e.target.value)};
      }
      return produkt;
    }
    ));
  }
  function aktiv(e) {
    setProdukte(produkte.map((produkt) => {
      if (produkt.produktId === parseInt(e.target.id.substring(5))) {
        return {...produkt, aktiv: e.target.checked};
      }
      return produkt;
    }
    ));
  }

  return (
    <div>
      <form onSubmit={(e) => ändern(e)}>
        {produkte.map((produkt) => (
          <div key={produkt.produktId}>
            <h2>{produkt.name}</h2>
            <h3>Bestand:</h3>
            <input type="number" id={"bestand"+ produkt.produktId} defaultValue={produkt.bestand} onChange={(e) => bestand(e)} />
            <h3>Verkaufspreis:</h3>
            <input type="number" id={"preis"+ produkt.produktId} defaultValue={produkt.preis} onChange={(e) => preis(e)}/>
            <h3>Akiv:</h3>
            <input type="checkbox" id={"aktiv" + produkt.produktId} defaultChecked={produkt.aktiv} onChange={(e) => aktiv(e)}/>
            <h3>Hinterraumbestand(noch keine Funktion):</h3>
            <input type="number" />
            <h3>Einkaufspreis(noch keine Funktion):</h3>
            <input type="number" />
          </div>
        ))}
        <button>Aktualisieren</button>
      </form>
    </div>
  );
}
export default ProduktSeite;
