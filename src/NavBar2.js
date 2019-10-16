import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "./AppContext.js";
import LoginModal from "./LoginModal";
import RegistratioForm from "./RegisterationForm";
// import { Modal, Form, Icon, Input, Button, Alert } from 'antd';


const LoginGroup = prop => {

  const [globalState] = useContext(AppContext);

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


const NavBar = (prop) => {

  const [globalState, setGlobalState] = useContext(AppContext);
  const [stateRF, setStateRF] = useState({ visible: false });

  const [state, setState] = useState({
    currentPage: prop.location,
    home: prop.location === '/' ? 'nav-item active' : 'nav-item',
    about: prop.location === '/about' ? 'nav-item active' : 'nav-item',
    contact: prop.location === '/contact' ? 'nav-item active' : 'nav-item'
  });

  useEffect(() => {
    if (prop.location !== state.currentPage) {
      setState({
        currentPage: prop.location,
        home: prop.location === '/' ? 'nav-item active' : 'nav-item',
        about: prop.location === '/about' ? 'nav-item active' : 'nav-item',
        contact: prop.location === '/contact' ? 'nav-item active' : 'nav-item'
      })
    }
  });


  const logOutUser = () => {
    // setStateLogin({ visible: false });
    setGlobalState({ ...globalState, loggedIn: false, loginForm: false });
    // console.log('LogOut ~ Login Visible', stateLogin.visible);
    // console.log('LogOut ~ Global State Loggedin', globalState.loggedIn);
  };

  const logInUser = () => {
    setGlobalState({ ...globalState, loginForm: true, loggedIn: false });
    // console.log('LogIn ~ Login Visible', stateLogin.visible);
    // console.log('LogIn ~ Global State Loggedin', globalState.loggedIn);
    // if (!globalState.loggedIn) {
    //   setStateLogin({ visible: true });
    // }

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
            <li className={state.home} >
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className={state.about}>
              <Link className="nav-link" to="/about">
                Documents
              </Link>
            </li>
            <li className={state.contact}>
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
      {globalState.loginForm && !globalState.loggedIn && (
        <LoginModal></LoginModal >
      )}
      <RegistratioForm visible={stateRF.visible} onClose={onRFClose}></RegistratioForm>



    </div>
  );
}

export default NavBar;
