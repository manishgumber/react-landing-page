import React, {useState, useContext} from 'react';
import {AppContext} from './App';
import LoginModal from './LoginModal';


// const LoginGroup = () => {

//     const [globalState, setGlobalState] = useContext(AppContext);
    

//     const logOutUser = () => {
//         setGlobalState({ ...globalState, loggedIn: false })
//     }

//     const logInUser = () => {
//         //setGlobalState({ ...globalState, loggedIn: true })
//         if(!globalState.loggedIn){
//           setState({loginModal:'visible'});
//         }
//     }

//     if(globalState.loggedIn) {
//         return (
//             <form className="form-inline">                
//                 <div>Welcome back, {globalState.userName}</div>
//                 <button onClick={logOutUser}  className="btn btn-outline-success mb-2 mx-sm-2" type="button">Log out</button>                
//             </form>  
//         )
//     } else {
//         return (
//             <form className="form-inline">                
//                 <button onClick={registerUser}  className="btn btn-primary mb-2 mx-sm-2" type="button">Register</button>    
//                 <button onClick={logInUser}  className="btn btn-primary mb-2 mx-sm-2" type="button">Log in</button>                
//             </form> 
           
//         )
//     }
    
// }

function NavBar(prop){    

    const [globalState, setGlobalState] = useContext(AppContext);
    
    const [state, setState] = useState({loginModal:'hidden'});
    

      const logOutUser = () => {
          setGlobalState({ ...globalState, loggedIn: false });
      }

      const logInUser = () => {
          //setGlobalState({ ...globalState, loggedIn: true })
          if(!globalState.loggedIn){
            setState({loginModal:'visible'});
          }
      }

      const  registerUser = () => {

      }

      function cancel(){
        setState({loginModal:'hidden'});
      }
    
      function signIn(){
        setState({loginModal:'hidden'});
        setGlobalState({ ...globalState, loggedIn: true });
      }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            {prop.logo}
          </a>
          <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About us
                </a>
              </li>
            </ul>
            <span className="navbar-text">
              {
                globalState.loggedIn &&
                <form className="form-inline">                
                  <div>Welcome back, {globalState.userName}</div>
                  <button onClick={logOutUser}  className="btn btn-outline-success mb-2 mx-sm-2" type="button">Log out</button>                
                </form>  
              }
              {
                !globalState.loggedIn &&
                <form className="form-inline">                
                  <button onClick={registerUser}  className="btn btn-primary mb-2 mx-sm-2" type="button">Register</button>    
                  <button onClick={logInUser}  className="btn btn-primary mb-2 mx-sm-2" type="button">Log in</button>                
                </form>
              }
            </span>
          </div>
        </nav>
        {
          state.loginModal === 'visible' && !globalState.loggedIn &&
          <LoginModal onClose={cancel} onCancel={cancel} onSignIn={signIn}></LoginModal>
        }
      </div>
      
    );
}


export default NavBar;