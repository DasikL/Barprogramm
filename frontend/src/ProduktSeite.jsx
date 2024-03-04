import { useEffect, useState } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function ProduktSeite() {
  //TODO: Log the changes as a bardienst in the database and add fields for before and after change stocks

  //Variables

  const [produkte, setProdukte] = useState([]);
  const [neuesBild, setBild] = useState("");
  const [geld, setGeld] = useState();
  const [singleProdukt, setSingleProdukt] = useState();
  const [änderungenBilder, setÄnderungenBilder] = useState({});
  const [bilder, setBilder] = useState({});

  let date = new Date();
  const [bardienst, setBardienst] = useState({
    name: "obk",
    datum: date.toISOString().split("T")[0],
    uhrzeit: date.toISOString().split("T")[1].split(".")[0],
    kommentar: "",
    geld: [],
    differenz: 0,
    anfangsbestand: {},
    endbestand: {},
  });

  //Functions

  //gets products and money from the server
  useEffect(() => {
    fetchData();
  }, []);



  async function fetchData() {
    await fetch("http://localhost:8080/api/v1/produkt", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        let current = {};
        data.map(async (produkt) => {
          await fetch("http://localhost:8080/storage/download?filename=" + produkt.bild, {
            method: "GET",
          })
            .then((response) => response.blob())
            .then((data) => {
              current[produkt.produktId] = URL.createObjectURL(data);
            });
        }
        );
        setProdukte(data);
        setBilder(current);
      });
    await fetch("http://localhost:8080/api/v1/geld", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setGeld(data);
      });
  }

  //uploades changes to the database
  async function ändern(e) {
    e.preventDefault();
    await produktfetch();
    await fetch("http://localhost:8080/api/v1/geld", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geld),
    });
    await fetch("http://localhost:8080/api/v1/bardienst/obk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bardienst),
    });
    window.location.reload();
  }

  async function produktfetch() {
    produkte.forEach((produkt) => {
      if (änderungenBilder[produkt.produktId]) {
        fetch("http://localhost:8080/storage/delete?filename=" + produkt.bild, {
          method: "DELETE",
        })
        let formData = new FormData();
        formData.append("image", änderungenBilder[produkt.produktId]);
        fetch("http://localhost:8080/storage/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            // Update the product's image name after successful upload
            produkt.bild = data;

            // Now, send the updated product data via PUT request
            return fetch("http://localhost:8080/api/v1/produkt/change", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(produkt),
            });
          }
          )
      }
      else {
        fetch("http://localhost:8080/api/v1/produkt/change", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produkt),
        });
      }
    });
  }

      async function hinzufügen(e) {
        e.preventDefault();
        let formData = new FormData();
        let filename;
        formData.append("image", neuesBild);
        await fetch("http://localhost:8080/storage/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            filename = data;
          });
        await fetch("http://localhost:8080/api/v1/produkt/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: e.target[0].value,
            bestand: e.target[1].value,
            preis: e.target[2].value,
            aktiv: e.target[3].checked,
            bild: filename,
          }),
        });
        window.location.reload();
      }

      function endbestand(e, produktId) {
        setProdukte(
          produkte.map((produkt) => {
            if (produkt.produktId === produktId) {
              return { ...produkt, bestand: parseInt(e.target.value) };
            }
            return produkt;
          }),
        );
        let current = bardienst;
        if (!bardienst.anfangsbestand[produktId]) {
          current.anfangsbestand[produktId] = document.getElementById(
            "abestand" + produktId,
          ).value;
        }
        current.endbestand[produktId] = e.target.value;
        setBardienst(current);
      }

      function anfangsbestand(e) {
        setBardienst({
          ...bardienst,
          anfangsbestand: {
            ...bardienst.anfangsbestand,
            [e.target.id.substring(8)]: parseInt(e.target.value),
          },
        });
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
        document.getElementById("bild" + e.target.id.substring(4)).src =
          URL.createObjectURL(file);
        setÄnderungenBilder({
          ...änderungenBilder,
          [e.target.id.substring(4)]: file,
        });
      }

      function anfangsgeld(e) {
        let geld = bardienst.geld;
        geld[0] = parseFloat(e.target.value);
        setBardienst({
          ...bardienst,
          geld: geld,
        });
      }

      function endgeld(e) {
        let geld = bardienst.geld;
        geld[1] = parseFloat(e.target.value);
        setBardienst({
          ...bardienst,
          geld: geld,
        });
        setGeld(parseFloat(e.target.value));
      }

      async function bild2(e) {
        const file = e.target.files[0];
        setBild(file);
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

      async function löschen() {
        let produktId = singleProdukt.produktId;
        await fetch("http://localhost:8080/storage/delete?filename=" + singleProdukt.bild, {
          method: "DELETE",
        });
        await fetch("http://localhost:8080/api/v1/produkt/" + produktId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchData();
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
              <div className="mb-5 row">
                <div className="col">
                  <label htmlFor="geld" className="form-label">
                    Anfangsbestand Geld:
                  </label>
                  <input
                    type="number"
                    id="ageld"
                    className="form-control"
                    defaultValue={geld}
                    step="0.01"
                    onChange={(e) => anfangsgeld(e)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="geld" className="form-label">
                    Endbestand Geld:
                  </label>
                  <input
                    type="number"
                    id="egeld"
                    className="form-control"
                    defaultValue={geld}
                    step="0.01"
                    onChange={(e) => endgeld(e)}
                  />
                </div>
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
                          src={bilder[produkt.produktId]}
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
                            id={"abestand" + produkt.produktId}
                            className="form-control mb-2"
                            defaultValue={produkt.bestand}
                            onChange={(e) => anfangsbestand(e)}
                          />
                          <input
                            type="number"
                            id={"ebestand" + produkt.produktId}
                            className="form-control"
                            defaultValue={produkt.bestand}
                            onChange={(e) => endbestand(e, produkt.produktId)}
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
                        <div className="mb-3 d-grid d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#löschen"
                            onClick={() => setSingleProdukt(produkt)}
                          >
                            Produkt löschen
                          </button>
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
            id="löschen"
            tabIndex="-1"
            aria-labelledby="löschenLabel"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="löschenLabel">
                    Produkt löschen
                  </h1>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Wollen Sie das Produkt wirklich löschen?</p>
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
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => löschen()}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            </div>
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
                        defaultChecked = {true}
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
