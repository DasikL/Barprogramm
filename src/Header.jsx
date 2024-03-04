import { useEffect, useState, useContext } from "react";
import { ObkContext } from "./App";
import { useNavigate } from "react-router-dom";

function Header() {
  //Variables

  const navigate = useNavigate();
  const obk = useContext(ObkContext);
  const [password, setPassword] = useState("");

  //Functions

  //function to check if the password is correct

  async function handleSubmit(e) {
    e.preventDefault();
    if (password === "") {
      alert("Bitte geben Sie das Passwort ein!");
      return;
    }
    obk[1](true);
    navigate("/obk/produkt");
    e.target.reset();
  }

  if (obk[0]) {
    //show the menu for the OBK
    return (
      <>
        <div className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
              Barprogramm
            </a>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-target="#offcanvasRight"
              data-bs-toggle="offcanvas"
            >
              Menu
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
            <h5 id="offcanvasRightLabel">OBK</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav flex-column nav-pills nav-fill">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  aria-current="page"
                  data-bs-toggle="pill"
                  onClick={() => navigate("/obk/produkt")}
                >
                  Produkte
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  aria-current="page"
                  data-bs-toggle="pill"
                  onClick={() => navigate("/obk/benutzer")}
                >
                  Benutzer
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  aria-current="page"
                  data-bs-toggle="pill"
                  onClick={() => navigate("/obk/bardienst")}
                >
                  Bardienste
                </button>
              </li>
            </ul>
          </div>
          <div className="offcanvas-footer">
            <button
              type="button"
              className="btn btn-danger w-100 justify-content-center m-0"
              data-bs-toggle="offcanvas"
              style={{ borderRadius: "0px" }}
              onClick={() => {
                obk[1](false);
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }

  //show the login form if obk is not logged in
  else {
    return (
      <>
        <div className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a href="#" className="navbar-brand" onClick={() => navigate("/")}>
              Barprogramm
            </a>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              data-bs-backdrop="hidden"
              data-bs-target="#offcanvasRight1"
            >
              OBK
            </button>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-2"
          id="offcanvasRight1"
          aria-labelledby="offcanvasRightLabel1"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel1">OBK</h5>
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
              <input
                type="submit"
                value="Login"
                className="btn btn-primary w-100 justify-content-center m-0"
                data-bs-toggle="offcanvas"
                data-bs-dismiss="offcanvas"
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
