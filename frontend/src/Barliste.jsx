import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BardienstContext, GeldContext } from "./App";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function Barliste(props) {
  

  //Variables


  let bardienst = useContext(BardienstContext);
  let geldbestand = useContext(GeldContext);
  const navigate = useNavigate();

  //funcion for money formatting
  let euro = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  //Initialize states from last session or empty
  const [differenz, setDifferenz] = useState(0);
  const [anfangsbestand, setAnfangsbestang] = useState(() => {
    if (localStorage.getItem("bardienst")) {
      return JSON.parse(localStorage.getItem("bardienst")).anfangsbestand;
    } else {
      return {};
    }
  });
  const [endbestand, setEndbestand] = useState(() => {
    if (localStorage.getItem("bardienst")) {
      return JSON.parse(localStorage.getItem("bardienst")).endbestand;
    } else {
      return {};
    }
  });
  const [activeTabs, setActiveTabs] = useState({});

  

  //useEffects
  
  
  //Make sure someone is doing a bardienst before they can access the page
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/");
    }
  }, []);

  //Save the bardienst in localstorage so the user can reload or close the page without losing the data
  useEffect(() => {
    if (
      props.props.length > 0 &&
      activeTabs[props.props[0].produktId] === undefined
    ) {
      props.props.forEach((item) => {
        setActiveTabs((prev) => ({
          ...prev,
          [item.produktId]: item.produktId + "Produkt",
        }));
      });
    }
  }, [props.props]);


  //Calculate the difference of all products and the money when something changes
  useEffect(() => {
    let result = 0;
    Object.keys(anfangsbestand).forEach((key) => {
      const anfang = parseFloat(anfangsbestand[key]);
      const end = parseFloat(endbestand[key]);
      let diff = end - anfang;
      if (props.props.length > 0) {
        let item = props.props.find((item) => item.produktId == key);
        diff *= item.preis;
      }
      result += diff;
    });
    let AnfangsGeld = parseFloat(bardienst[0].geld[0]);
    let EndGeld = parseFloat(bardienst[0].geld[1]);
    result += Math.round((EndGeld - AnfangsGeld) * 100) / 100;
    setDifferenz(result);
  }, [anfangsbestand, endbestand, bardienst]);

  //Set the difference in the bardienst context so it can be uploaded
  //needed to be a seperate useEffect because else it woudn't work(I don't know why)
  useEffect(() => {
    bardienst[1]((prev) => ({ ...prev, differenz: differenz }));
  }, [differenz]);


  //Functions

  
  //Upload the bardienst to the server and reset the states
  const upload = (e) => {
    fetch("http://localhost:8080/api/v1/bardienst/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bardienst[0]),
    });
    bardienst[1]((prev) => ({
      ...prev,
      anfangsbestand: {},
      endbestand: {},
      geld: [],
      differenz: 0,
      kommentar: "",
      name: "",
      zimmer: "",
      datum: "",
      uhrzeit: "",
    }));
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    e.preventDefault();
  };


  //Change the bestand of a product and change the color of the input field
  //Bestand muss hier nochmal gespeichert werden, da sonst die Vorherigen Werte(vom letzten render) in Bardienst gespeichert werden
  function anfangsbestandChange(e, item) {
    let bestand = anfangsbestand;
    bestand[item.produktId] = e.target.value;

    if (e.target.value === item.bestand.toString()) {
      e.target.style.color = "black";
    } else {
      e.target.style.color = "red";
    }
    setAnfangsbestang((prev) => ({
      ...prev,
      [item.produktId]: e.target.value,
    }));
    bardienst[1]((prev) => ({
      ...prev,
      anfangsbestand: bestand,
    }));
  }

  function endbestandChange(e, item) {
    let bestand = endbestand;
    bestand[item.produktId] = e.target.value;

    setEndbestand((prev) => ({
      ...prev,
      [item.produktId]: e.target.value,
    }));
    bardienst[1]((prev) => ({ ...prev, endbestand: bestand }));
  }

  //Change the money and change the color of the input field
  function geldChange(e, index) {
    let geld = bardienst[0].geld;
    if (index === 0 && e.target.value !== geldbestand[0].toString()) {
      e.target.style.color = "red";
    } else {
      e.target.style.color = "black";
    }
    geld[index] = e.target.value;
    bardienst[1]((prev) => ({ ...prev, geld: geld }));
  }

  function kommentarChange(e) {
    bardienst[1]((prev) => ({ ...prev, kommentar: e.target.value }));
  }

  //functionality for buttons to change the active tab
  function toggleTabs(bool) {
    if (bool) {
      props.props.forEach((item) => {
        setActiveTabs((prev) => ({
          ...prev,
          [item.produktId]: item.produktId + "Produkt",
        }));
      });
    } else {
      props.props.forEach((item) => {
        setActiveTabs((prev) => ({
          ...prev,
          [item.produktId]: item.produktId + "Bestand",
        }));
      });
    }
  }

  function search(e) {
    let input, filter, div, a, i, txtValue;
    input = e.target.value;
    filter = input.toUpperCase();
    div = document.getElementById("produktcards");
    div = div.getElementsByClassName("col-sm-6");
    for (i = 0; i < div.length; i++) {
      a = div[i].getElementsByClassName("card-title")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }

  function activateFertigModal(e) {
    e.preventDefault();
    let myModal = new bootstrap.Modal(document.getElementById("fertigModal"), {
      keyboard: false,
    });
    myModal.show();
  }

  //Components


  //Modal for the end of the bardienst
  function FertigModal() {
    return (
      <div
        className="modal fade"
        id="fertigModal"
        tabIndex="-1"
        aria-labelledby="fertigModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="fertigModalLabel">
                Bardienst beenden
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" />
                <label htmlFor="checkbox1" className="form-check-label">
                  Checkbox1
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="kommentar" className="form-label">
                  Kommentar:
                </label>
                <input
                  type="text"
                  placeholder="Kommentar"
                  className="form-control"
                  id="kommentar"
                  onChange={(e) => kommentarChange(e)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <h5 className="">Differenz: {euro.format(differenz)}</h5>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={(e) => upload(e)}
              >
                Bardienst beenden
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //Site
  return (
    <>
      <form onSubmit={(e) => activateFertigModal(e)}>
        <div className="container">
          <h2>Barliste</h2>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Geld</h3>
              <div className="row">
                <div className="col">
                  <label htmlFor="geldanfangsbestand" className="form-label">
                    Anfangsbestand:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="geldanfangsbestand"
                    className="form-control"
                    onChange={(e) => geldChange(e, 0)}
                    defaultValue={bardienst[0].geld[0]}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="geldendbestand" className="form-label">
                    Endbestand:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="geldendbestand"
                    className="form-control"
                    onChange={(e) => geldChange(e, 1)}
                    defaultValue={bardienst[0].geld[1]}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 pt-5 pb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Produkt suchen"
              onChange={(e) => search(e)}
            />
            <button
              className="btn btn-primary col-2"
              onClick={() => toggleTabs(true)}
              type="button"
            >
              Produkte anzeigen
            </button>
            <button
              className="btn btn-primary col-2"
              onClick={() => toggleTabs(false)}
              type="button"
            >
              Bestände anzeigen
            </button>
          </div>

          <div className="row row-cols-auto g-4" id="produktcards">
            {props.props.map((item, index) => {
              
              return (
                <div
                  className="col-md-4 col-sm-6 col-lg-3 mb-3 mb-sm-0"
                  key={index}
                >
                  <div className="card">
                    <div className="card-header">
                      <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                          <button
                            className={
                              "nav-link" +
                              (activeTabs[item.produktId] ===
                              item.produktId + "Produkt"
                                ? " active"
                                : "")
                            }
                            onClick={() =>
                              setActiveTabs((prev) => ({
                                ...prev,
                                [item.produktId]: item.produktId + "Produkt",
                              }))
                            }
                            type="button"
                          >
                            Produkt
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={
                              "nav-link" +
                              (activeTabs[item.produktId] ===
                              item.produktId + "Bestand"
                                ? " active"
                                : "")
                            }
                            onClick={() =>
                              setActiveTabs((prev) => ({
                                ...prev,
                                [item.produktId]: item.produktId + "Bestand",
                              }))
                            }
                            type="button"
                          >
                            Bestand
                          </button>
                        </li>
                      </ul>
                      <div className="card-body">
                        <div className="tab-content">
                          <div
                            className={
                              "tab-pane fade" +
                              (activeTabs[item.produktId] ===
                              item.produktId + "Produkt"
                                ? " show active"
                                : "")
                            }
                            id={item.produktId + "Produkt"}
                          >
                            <img
                              src={item.bild}
                              alt={item.name}
                              className="card-img-top"
                            />
                            <h3 className="card-title">{item.name}</h3>
                            <p className="card-text">
                              Preis: {euro.format(item.preis)}
                            </p>
                          </div>
                          <div
                            className={
                              "tab-pane fade" +
                              (activeTabs[item.produktId] ===
                              item.produktId + "Bestand"
                                ? " show active"
                                : "")
                            }
                            id={item.produktId + "Bestand"}
                          >
                            <h3 className="card-title">{item.name}</h3>
                            <div className="mb-3">
                              <label
                                htmlFor={item.produktId + "a"}
                                className="form-label"
                              >
                                Anfangsbestand:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id={item.produktId + "a"}
                                defaultValue={anfangsbestand[item.produktId]}
                                onChange={(e) => anfangsbestandChange(e, item)}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor={item.produktId + "e"}
                                className="form-label"
                              >
                                Endbestand:
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id={item.produktId + "e"}
                                defaultValue={endbestand[item.produktId]}
                                onChange={(e) => endbestandChange(e, item)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="navbar navbar-light bg-light fixed-bottom">
          <div className="container">
            <div className="p-2">
              <h3>Differenz: {differenz ? euro.format(differenz) : "0€"}</h3>
            </div>
            <div className="p-2">
              <input
                className="btn btn-primary btn-lg"
                type="submit"
                value="Bardienst beenden"
              ></input>
            </div>
          </div>
        </div>
      </form>
      <FertigModal />
    </>
  );
}
export default Barliste;

Barliste.propTypes = {
  props: PropTypes.array,
};
