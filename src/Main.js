import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppContext from "./AppContext";
import App from "./App";
import About from "./About";
import Contact from "./Contact";
import RegistrationForm from './RegisterationForm';
import NavBar from "./NavBar2";
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
    loggedIn: false,
    userName: "Manish",
    users: ["Jim", "Jane", "Mohammad", "Mary"],
    feed: [
      { user: "Jim", comment: "This comment is from Jim" },
      { user: "Jane", comment: "Going to tennis practice tonight" },
      { user: "Mohammad", comment: "Big traffic near downtown dubai" },
      { user: "Mary", comment: "Graduating in 1 week! #exicted" }
    ]
  });

  // useEffect(()=>{
  //   console.log('The global state has changed');
  //   console.log(globalState.loggedIn);
  // })

  const LayoutRoute = ({ location, exact, component }) => {
    return (
      <div>
        <NavBar location={location.path} logo="AMINGO"></NavBar>
        <Route path="/" exact={exact} component={component} />
      </div>
    );

  }

  // const LayoutRoute = ({location, path, exact, component}) => {
  //   <div>
  //     <NavBar location={props.location.pathname} logo="AMINGO"></NavBar>
  //     <Route path="/" exact component={App} />
  //   </div>

  // }

  return (

    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        {/* <Route path="/" component={
          (props) =>
            <NavBar location={props.location.pathname} logo="AMINGO"></NavBar>
        } /> */}
        <Switch>
          <LayoutRoute path="/" exact component={App} />
          <LayoutRoute path="/about" component={About} />
          <LayoutRoute path="/contact" component={Contact} />
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
