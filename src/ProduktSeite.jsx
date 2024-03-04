import { useEffect, useState } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function ProduktSeite() {
  //TODO: Log the changes as a bardienst in the database and add fields for before and after change stocks

  //Variables

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
    },
    {
      produktId: 5,
      name: "Beck's",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Becks.jpg",
    },
    {
      produktId: 6,
      name: "Bitburger Alkoholfrei",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Bitburger alkoholfrei.jpg",
    },
    {
      produktId: 7,
      name: "Bitburger",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Bitburger.jpg",
    },
    {
      produktId: 8,
      name: "Veltins",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Veltins.jpg",
    },
    {
      produktId: 9,
      name: "Hansa",
      bestand: 0,
      preis: 1.0,
      aktiv: true,
      bild: "Hansa.jpg",
    },
    {
      produktId: 10,
      name: "Tyskie",
      bestand: 0,
      preis: 1.4,
      aktiv: true,
      bild: "Tyskie.jpg",
    },
    {
      produktId: 11,
      name: "Gösser Radler",
      bestand: 0,
      preis: 1.5,
      aktiv: true,
      bild: "Gosser Radler.jpg",
    },
    {
      produktId: 12,
      name: "Vitamalz",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Vitamalz.jpg",
    },
    {
      produktId: 13,
      name: "Club Mate",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Club Mate 20er.jpg",
    },
    {
      produktId: 14,
      name: "Coca Cola",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Coca Cola.jpg",
    },
    {
      produktId: 15,
      name: "Cocal Cola Light",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Coca Cola Light.jpg",
    },
    {
      produktId: 16,
      name: "Fanta",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Fanta.jpg",
    },
    {
      produktId: 17,
      name: "Mezzo Mix",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Mezzo Mix.jpg",
    },
    {
      produktId: 18,
      name: "Sprite",
      bestand: 0,
      preis: 1.7,
      aktiv: true,
      bild: "Sprite.jpg",
    },
    {
      produktId: 19,
      name: "Wasser Classic",
      bestand: 0,
      preis: 0.9,
      aktiv: true,
      bild: "Wasser Classic blau.jpg",
    },
    {
      produktId: 20,
      name: "Wasser Medium",
      bestand: 0,
      preis: 0.9,
      aktiv: true,
      bild: "Wasser Medium grun.jpg",
    },
    {
      produktId: 21,
      name: "Fassbrause Maracuja",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Maracuja 24er.jpg",
    },
    {
      produktId: 22,
      name: "Fassbrause Rhabarber",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Rhababer 24er.jpg",
    },
    {
      produktId: 23,
      name: "Fassbrause Zitrone",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Zitrone 24er.jpg",
    },
    {
      produktId: 24,
      name: "Fassbrause Holunder",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Holunder 24er.jpg",
    },
    {
      produktId: 25,
      name: "Fassbrause Orange",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Orange 24er.jpg",
    },
    {
      produktId: 26,
      name: "Fassbrause Apfel",
      bestand: 0,
      preis: 1.3,
      aktiv: true,
      bild: "Fassbrause Apfel 24er.jpg",
    },
    {
      produktId: 30,
      name: "Salzstangen",
      bestand: 0,
      preis: 1.2,
      aktiv: true,
      bild: "Salzstangen.jpg",
    },
    {
      produktId: 31,
      name: "Schokoriegel",
      bestand: 0,
      preis: 0.8,
      aktiv: true,
      bild: "Andere Schokoriegel.jpg",
    },
    {
      produktId: 32,
      name: "Chips",
      bestand: 0,
      preis: 2.5,
      aktiv: true,
      bild: "Funny Frisch Chips.jpg",
    },
    {
      produktId: 33,
      name: "Pizza",
      bestand: 0,
      preis: 3.0,
      aktiv: true,
      bild: "Pizza.jpg",
    },
  ]);
  const [geld, setGeld] = useState(45.0);
  const [änderungenBilder, setÄnderungenBilder] = useState({});

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

  //uploades changes to the database
  async function ändern(e) {
    e.preventDefault();
    window.location.reload();
  }

  async function hinzufügen(e) {
    e.preventDefault();
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

  async function löschen() {}

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
                      src={"../src/assets/pictures/" + produkt.bild}
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
                    defaultChecked={true}
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
                  <input type="file" className="form-control" required />
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
