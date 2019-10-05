import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "./AppContext.js";
import LoginModal from "./LoginModal";
import RegistratioForm from "./RegisterationForm";
import { stat } from "fs";

const LoginGroup = prop => {

  const [globalState, setGlobalState] = useContext(AppContext);

  if (globalState.loggedIn) {
    return (
      <form className="form-inline">
        <div>Welcome back, {globalState.userName}</div>
        <button onClick={prop.onLogOutUser} className="btn btn-outline-success mb-2 mx-sm-2" type="button">Log out</button>
      </form>
    );
  } else {
    return (
      <form className="form-inline">
        <button onClick={prop.onRegisterUser} className="btn btn-primary mb-2 mx-sm-2" type="button">Register</button>
        <button onClick={prop.onLogInUser} className="btn btn-primary mb-2 mx-sm-2" type="button"> Log in </button>
      </form>
    );
  }
};

function NavBar(prop) {

  const [globalState, setGlobalState] = useContext(AppContext);
  const [stateLogin, setStateLogin] = useState({ loading: false, visible: false });
  const [stateRF, setStateRF] = useState({ visible: false });

  const [stateLoc, setStateLoc] = useState({
    currentPage: prop.location,
    home: prop.location === "/" ? "active" : "",
    about: prop.location === "/about" ? "active" : "",
    contact: prop.location === "/contact" ? "active" : ""
  });

  useEffect(() => {
    if (prop.location !== stateLogin.currentPage) {
      setStateLoc({
        currentPage: prop.location,
        home: prop.location === "/" ? "active" : "",
        about: prop.location === "/about" ? "active" : "",
        contact: prop.location === "/contact" ? "active" : ""
      })
    }
  });

  // function cancel() {
  //   setState({ loginModal: "hidden" });
  // }

  function signIn() {
    setStateLogin({ visible: false });
    setGlobalState({ ...globalState, loggedIn: true });
  }

  const logOutUser = () => {
    setStateLogin({ visible: false });
    setGlobalState({ ...globalState, loggedIn: false });
    // console.log('LogOut ~ Login Visible', stateLogin.visible);
    // console.log('LogOut ~ Global State Loggedin', globalState.loggedIn);
  };

  const logInUser = () => {
    setStateLogin({ visible: true });
    // console.log('LogIn ~ Login Visible', stateLogin.visible);
    // console.log('LogIn ~ Global State Loggedin', globalState.loggedIn);
    // if (!globalState.loggedIn) {
    //   setStateLogin({ visible: true });
    // }

  };

  const handleOk = () => {
    setStateLogin({ ...stateLogin, loading: true });
    setTimeout(() => {
      setGlobalState({ ...globalState, loggedIn: true });
      setStateLogin({ loading: false, visible: false });
    }, 1000);
  };

  const handleCancel = () => {
    setStateLogin({ ...stateLogin, visible: false });
  };

  //REGISTER USER

  const registerUser = () => {
    setStateRF({ visible: true });
  };

  const onRFClose = () => {
    setStateRF({ visible: false });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {prop.logo}
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${stateLoc.home}`}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className={`nav-item ${stateLoc.about}`}>
              <Link className="nav-link" to="/about">
                About us
              </Link>
            </li>
            <li className={`nav-item ${stateLoc.contact}`}>
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            <LoginGroup onLogInUser={logInUser} onLogOutUser={logOutUser} onRegisterUser={registerUser}></LoginGroup>
          </span>
        </div>
      </nav>
      {stateLogin.visible && !globalState.loggedIn && (
        <LoginModal visible={stateLogin.visible} onOk={handleOk} onSubmit={handleOk} onCancel={handleCancel} loading={stateLogin.loading}></LoginModal>
      )}
      <RegistratioForm visible={stateRF.visible} onClose={onRFClose}></RegistratioForm>
    </div>
  );
}

export default NavBar;
