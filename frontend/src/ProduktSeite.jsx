import { useEffect, useState } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function ProduktSeite() {
  //Variables

  const [produkte, setProdukte] = useState([]);
  const [neuesBild, setBild] = useState("");
  const [geld, setGeld] = useState();

  const [modalInstance, setModalInstance] = useState();
  const [modalElement, setModalElement] = useState();

  //Functions

  //gets products and money from the server
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/produkt")
      .then((response) => response.json())
      .then((data) => setProdukte(data));
    fetch("http://localhost:8080/api/v1/geld", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setGeld(data);
      });
  }, []);

  useEffect(() => {
    let backdrops = document.getElementsByClassName("modal-backdrop");
    if (backdrops.length > 1) {
      backdrops[0].remove();
    }
    setModalElement(document.getElementById("neuesProdukt"));
    if (modalElement) {
      modalElement.addEventListener("show.bs.modal", function (event) {
        setModalInstance(bootstrap.Modal.getInstance(modalElement));
      });
    }
  });

  //uploades changes to the database
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
    fetch("http://localhost:8080/api/v1/geld", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geld),
    });
    alert("Änderungen gespeichert");
    e.preventDefault();
  }

  function hinzufügen(e) {
    e.preventDefault();
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
    modalInstance.hide();
    e.target.reset();
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

  function suche(e) {
    let input, filter, div, a, i, txtValue;
    input = e.target.value;
    filter = input.toUpperCase();
    div = document.getElementById("produktcards");
    div = div.getElementsByClassName("col-md-4");
    for (i = 0; i < div.length; i++) {
      a = div[i].getElementsByClassName("card-header")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }
  return (
    <>
      <div className="container mt-3">
        <form onSubmit={(e) => ändern(e)}>
          <div className="row">
            <div className="col-6">
              <h1>Produkte ändern</h1>
            </div>
            <div className="col-3 d-grid">
              <button
                type="button"
                className="btn btn-primary btn-lg mb-3"
                data-bs-toggle="modal"
                data-bs-target="#neuesProdukt"
              >
                neues Produkt hinzufügen
              </button>
            </div>
            <div className="col-3 d-grid">
              <input
                type="submit"
                value="Änderungen speichern"
                className="btn btn-primary btn-lg mb-3"
              />
            </div>
          </div>
          <hr className="mt-2 mb-3" />
          <div className="mb-5">
            <label htmlFor="geld" className="form-label">
              Geldbestand:
            </label>
            <input
              type="number"
              id="geld"
              className="form-control"
              defaultValue={geld}
              step="0.01"
              onChange={(e) => setGeld(e.target.value)}
            />
          </div>
          <input
            type="text"
            id="suchen"
            placeholder="Produkt suchen"
            onChange={(e) => suche(e)}
            className="form-control mb-3"
          />
          <div className="row row-cols-auto g-4" id="produktcards">
            {produkte.map((produkt) => (
              <div
                className="col-md-4 col-lg-3 mb-2 mb-sm-0"
                key={produkt.produktId}
              >
                <div className="card">
                  <div className="card-header">
                    <h3>{produkt.name}</h3>
                  </div>
                  <div className="card-body">
                    <img
                      src={produkt.bild}
                      alt={produkt.name}
                      className="card-img-top"
                    />
                    <div className="mb-3">
                      <label
                        htmlFor={"bestand" + produkt.produktId}
                        className="form-label"
                      >
                        Bestand:
                      </label>
                      <input
                        type="number"
                        id={"bestand" + produkt.produktId}
                        className="form-control"
                        defaultValue={produkt.bestand}
                        onChange={(e) => bestand(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={"preis" + produkt.produktId}
                        className="form-label"
                      >
                        Preis:
                      </label>
                      <input
                        type="number"
                        id={"preis" + produkt.produktId}
                        className="form-control"
                        defaultValue={produkt.preis}
                        onChange={(e) => preis(e)}
                      />
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input
                        type="checkbox"
                        role="switch"
                        className="form-check-input"
                        id={"aktiv" + produkt.produktId}
                        defaultChecked={produkt.aktiv}
                        onChange={(e) => aktiv(e)}
                      />
                      <label
                        htmlFor={"aktiv" + produkt.produktId}
                        className="form-check-label"
                      >
                        Aktiv
                      </label>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={"bild" + produkt.produktId}
                        className="form-label"
                      >
                        Bild:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id={"bild" + produkt.produktId}
                        onChange={(e) => bild(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div
        className="modal fade"
        id="neuesProdukt"
        tabIndex="-1"
        aria-labelledby="neuLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="neuLabel">
                Produkt hinzufügen
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(e) => hinzufügen(e)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="bestand" className="form-label">
                    Bestand:
                  </label>
                  <input type="number" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="preis" className="form-label">
                    Preis:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3 form-check form-switch">
                  <input
                    type="checkbox"
                    role="switch"
                    id="aktiv"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="aktiv">
                    Aktiv
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="bild" className="form-label">
                    Bild:
                  </label>
                  <input
                    type="file"
                    onChange={(e) => bild2(e)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="submit"
                  value="Produkt hinzufügen"
                  className="btn btn-primary"
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
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
