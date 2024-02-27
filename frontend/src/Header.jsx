import { useState, useContext } from "react";
import { ObkContext } from "./App";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const obk = useContext(ObkContext);
  const [password, setPassword] = useState("");

  async function checkOBK() {
    const response = await fetch("http://localhost:8080/api/v1/password", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: password,
    });
    const data = await response.json();
    return data;
  }

  function handleSubmit(e) {
    if (password === "") {
      alert("Bitte geben Sie das Passwort ein!");
      e.preventDefault();
      return;
    }
    const isObk = checkOBK();

    if (isObk) {
      obk[1](true);
      navigate("/obk");
    }
    e.preventDefault();
  }

  return (
    <>
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            Barprogramm
          </a>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
          >
            OBK
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">OBK Login</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(e) => handleSubmit(e)} className="">
            <h3 className="text-center">OBK Login</h3>
            <div className="my-3">
              <label htmlFor="password" className="form-label">
                Passwort
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Passwort"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="btn btn-primary" data-bs-dissmiss="offcanvas"/>
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;
