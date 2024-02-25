import { useEffect, useState } from "react";

function ProduktSeite() {

  //Produktänderungen als Bardienst abspeichern? oder Bargeld als eingene Datei speichern?

  const [produkte, setProdukte] = useState([]);
  const [neuesBild, setBild] = useState("");

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

  function hinzufügen(e) {
    if (
      neuesBild === "" ||
      e.target[0].value === "" ||
      e.target[1].value === "" ||
      e.target[2].value === ""
    ) {
      alert("Bitte füllen Sie alle Felder aus!");
      e.preventDefault();
      return;
    }

    fetch("http://localhost:8080/api/v1/produkt/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value,
        bestand: e.target[1].value,
        preis: e.target[2].value,
        aktiv: e.target[3].checked,
        bild: neuesBild,
      }),
    });
    alert("Produkt hinzugefügt");
    e.preventDefault();
  }

  function bestand(e) {
    setProdukte(
      produkte.map((produkt) => {
        if (produkt.produktId === parseInt(e.target.id.substring(7))) {
          return { ...produkt, bestand: parseInt(e.target.value) };
        }
        return produkt;
      }),
    );
  }

  function preis(e) {
    setProdukte(
      produkte.map((produkt) => {
        if (produkt.produktId === parseInt(e.target.id.substring(5))) {
          return { ...produkt, preis: parseInt(e.target.value) };
        }
        return produkt;
      }),
    );
  }

  function aktiv(e) {
    setProdukte(
      produkte.map((produkt) => {
        if (produkt.produktId === parseInt(e.target.id.substring(5))) {
          return { ...produkt, aktiv: e.target.checked };
        }
        return produkt;
      }),
    );
  }

  async function bild(e) {
    const file = e.target.files[0];
    const base64 = await converttoBase64(file);
    setProdukte(
      produkte.map((produkt) => {
        if (produkt.produktId === parseInt(e.target.id.substring(4))) {
          return { ...produkt, bild: base64 };
        }
        return produkt;
      }),
    );
  }

  async function bild2(e) {
    const file = e.target.files[0];
    const base64 = await converttoBase64(file);
    setBild(base64);
  }

  return (
    <>
      <div>
        <h1>Produkte ändern</h1>
        <form onSubmit={(e) => ändern(e)}>
          {produkte.map((produkt) => (
            <div key={produkt.produktId}>
              <h2>{produkt.name}</h2>
              <h3>Bestand:</h3>
              <input
                type="number"
                id={"bestand" + produkt.produktId}
                defaultValue={produkt.bestand}
                onChange={(e) => bestand(e)}
              />
              <h3>Verkaufspreis:</h3>
              <input
                type="number"
                id={"preis" + produkt.produktId}
                defaultValue={produkt.preis}
                onChange={(e) => preis(e)}
              />
              <h3>Akiv:</h3>
              <input
                type="checkbox"
                id={"aktiv" + produkt.produktId}
                defaultChecked={produkt.aktiv}
                onChange={(e) => aktiv(e)}
              />
              <h3>Bild:</h3>
              <input
                type="file"
                id={"bild" + produkt.produktId}
                onChange={(e) => bild(e)}
              />
              <img src={produkt.bild} alt={produkt.name} />
              <h3>Hinterraumbestand(noch keine Funktion):</h3>
              <input type="number" />
              <h3>Einkaufspreis(noch keine Funktion):</h3>
              <input type="number" />
            </div>
          ))}
          <button>Aktualisieren</button>
        </form>
      </div>
      <div>
        <h1>Neues Produkt hinzufügen</h1>
        <form onSubmit={(e) => hinzufügen(e)}>
          <h3>Name:</h3>
          <input type="text" />
          <h3>Bestand:</h3>
          <input type="number" />
          <h3>Verkaufspreis:</h3>
          <input type="number" step="0.01" />
          <h3>Aktiv:</h3>
          <input type="checkbox" />
          <h3>Bild:</h3>
          <input type="file" onChange={(e) => bild2(e)} />
          <button>Hinzufügen</button>
        </form>
      </div>
    </>
  );
}
export default ProduktSeite;

function converttoBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
