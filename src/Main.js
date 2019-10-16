import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AppContext from "./AppContext";
import App from "./App";
import About from "./About";
import Contact from "./Contact";
import NavBar from "./NavBar2";
import LoginModal from "./LoginModal";

// import NavBar from "./NavBar2";

// const AboutScreen = () =>{
//     return (
//         <div>
//         <h1>Weelcome to About page</h1>
//       </div>
//     )
// }

const Main = () => {

  const [globalState, setGlobalState] = useState({
    // loggedIn: false,
    loggedIn: localStorage.getItem('token') ? true : false,
    userName: "Manish",
    loginForm: false,
    users: ["Jim", "Jane", "Mohammad", "Mary"],
    feed: [
      { user: "Jim", comment: "This comment is from Jim" },
      { user: "Jane", comment: "Going to tennis practice tonight" },
      { user: "Mohammad", comment: "Big traffic near downtown dubai" },
      { user: "Mary", comment: "Graduating in 1 week! #exicted" }
    ]
  });

  useEffect(() => {

    // console.log('The global state has changed');
    // console.log(globalState.loggedIn);

    if (!localStorage.getItem('token') && globalState.loggedIn) {
      localStorage.setItem('token', globalState.token)
    }

    if (!globalState.loggedIn) {
      localStorage.removeItem('token');
    }

  })

  const LayoutRoute = ({ location, path, exact, component }) => {
    return (
      <div>
        <NavBar location={location.pathname} logo="AMINGO" />
        <Route path={path} exact={exact} component={component} />
      </div>
    );
  }

  // const PrivateRoute = ({ component: Component, ...restOfProps }) => {

  //   const [globalState] = useContext(AppContext);

  //   return (
  //     <Route
  //       {...restOfProps}
  //       render={
  //         // Check to see if user is logged in
  //         (props) => globalState.token || localStorage.getItem('token') ?
  //           // If yes, render the component
  //           (<Component {...props} />) :
  //           // Otherwise, redirect to /sign-in
  //           (
  //             // <Redirect to={{ pathname: '/sign-in',}}/>            

  //             <LoginModal></LoginModal>

  //           )
  //       }
  //     />)
  // }


  const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => {
      if (globalState.token || localStorage.getItem('token')) {
        return <Component {...props} />
      }
      else {
        return (
          <Redirect to={{ pathname: '/sign-in', }} />
        )
      }

      // const currentUser = authenticationService.currentUserValue;
      // if (!currentUser) {
      //     // not logged in so redirect to login page with the return url
      //     return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      // }

      // // check if route is restricted by role
      // if (roles && roles.indexOf(currentUser.role) === -1) {
      //     // role not authorised so redirect to home page
      //     return <Redirect to={{ pathname: '/'}} />
      // }

      // // authorised so return component
      // return <Component {...props} />
    }} />
  )




  // const PrivateRoute = ({ component: Component, ...restOfProps }) => {

  //   const [globalState, setGlobalState] = useContext(AppContext);
  //   if (globalState.token || localStorage.getItem('token')) {

  //   }


  //   return (
  //     <Route
  //       {...restOfProps}
  //       render={
  //         // Check to see if user is logged in
  //         (props) => globalState.token || localStorage.getItem('token') ?
  //           // If yes, render the component
  //           (<Component {...props} />) :
  //           // Otherwise, redirect to /sign-in
  //           (
  //             <Redirect to={{ pathname: '/sign-in',}}/>            
  //                       )
  //       }
  //     />)
  // }




  // const LayoutRoute = ({location, path, exact, component}) => {
  //   <div>
  //     <NavBar location={props.location.pathname} logo="AMINGO"></NavBar>
  //     <Route path="/" exact component={App} />
  //   </div>

  // }

  return (

    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <Switch>
          <LayoutRoute path="/" exact component={App} />
          <LayoutRoute path="/about" component={About} />
          <PrivateRoute path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>


    // <AppContext.Provider value={[globalState, setGlobalState]}>
    //   <BrowserRouter>
    //     {/* <Route path="/" component={
    //       (props) =>
    //         <NavBar location={props.location.pathname} logo="AMINGO"></NavBar>
    //     } /> */}
    //     <Switch>
    //       <LayoutRoute path="/" exact component={App} />
    //       <LayoutRoute path="/about" component={About} />
    //       <Route path="/contact" component={Contact} />
    //     </Switch>
    //   </BrowserRouter>
    // </AppContext.Provider>
  );
};

export default Main;
