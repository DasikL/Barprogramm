import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BardienstContext, GeldContext } from "./App";

function Barliste(props) {
  let bardienst = useContext(BardienstContext);
  let geldbestand = useContext(GeldContext);
  const navigate = useNavigate();
  let euro = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });


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

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let result = 0;
    Object.keys(anfangsbestand).forEach((key) => {
      const anfang = parseFloat(anfangsbestand[key]);
      const end = parseFloat(endbestand[key]);
      let diff = end-anfang;
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

  useEffect(() => {
    bardienst[1]((prev) => ({ ...prev, differenz: differenz }));
  }, [differenz]);

  const upload = (e) => {
    if (checkInput() === false) {
      e.preventDefault();
      return;
    }

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

  function checkInput() {
    let check = true;
    if (
      Object.keys(anfangsbestand).length !== props.props.length ||
      Object.keys(endbestand).length !== props.props.length
    ) {
      alert("Bitte füllen Sie alle Felder aus!");
      return false;
    }
    Object.keys(anfangsbestand).forEach((key) => {
      const anfang = parseInt(anfangsbestand[key]);
      const end = parseInt(endbestand[key]);
      if (anfang < end) {
        check = false;
      }
    });
    if (!check) {
      alert("Endbestand darf nicht größer als Anfangsbestand sein!");
      return false;
    }
  }

  function anfangsbestandChange(e, item) {
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
      anfangsbestand: anfangsbestand,
    }));
  }

  function endbestandChange(e, item) {
    setEndbestand((prev) => ({
      ...prev,
      [item.produktId]: e.target.value,
    }));
    bardienst[1]((prev) => ({ ...prev, endbestand: endbestand }));
  }

  function geldChange(e, index) {
    let geld = bardienst[0].geld;
    if(index === 0 && e.target.value !== geldbestand[0].toString()){
      e.target.style.color = "red";
    } else{
      e.target.style.color = "black";
    }
    geld[index] = e.target.value;
    bardienst[1]((prev) => ({ ...prev, geld: geld }));
  }

  function kommentarChange(e) {
    bardienst[1]((prev) => ({ ...prev, kommentar: e.target.value }));
  }

  return (
    <div>
      <h2>Barliste</h2>
      <div>
        <p>Geld:</p>
        <p>Anfangsbestand:</p>
        <input
          type="number"
          step="0.01"
          onChange={(e) => geldChange(e, 0)}
          defaultValue={bardienst[0].geld[0]}
        />
        <p>Endbestand:</p>
        <input
          type="number"
          step="0.01"
          onChange={(e) => geldChange(e, 1)}
          defaultValue={bardienst[0].geld[1]}
        />
      </div>
      {props.props.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.bild} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Preis: {euro.format(item.preis)}</p>
            <p>Anfangsbestand:</p>
            <input
              type="number"
              defaultValue={anfangsbestand[item.produktId]}
              onChange={(e) => anfangsbestandChange(e, item)}
            />
            <p>Endbestand:</p>
            <input
              type="number"
              defaultValue={endbestand[item.produktId]}
              onChange={(e) => endbestandChange(e, item)}
            />
          </div>
        );
      })}
      <h3>Differenz: {euro.format(differenz)}</h3>
      <input type="text" placeholder="Kommentar" onChange={(e) => kommentarChange(e)}/>
      <button onClick={(e) => upload(e)}>Bardienst beenden</button>
    </div>
  );
}
export default Barliste;

Barliste.propTypes = {
  props: PropTypes.array,
};
