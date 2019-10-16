

import React from 'react';
// import logo from './logo.svg';
// import NavBar from './NavBar2';
import Jumbotron from './Jumbotron';
//import ColorButton from './ColorButton';
// import Feed from './Feed';
import './App.css';
import Modal from './Modal';


// const MyButton = () => {
//   const [theNumber, setTheNumber] = useState(0);

//   const clickHandler = () => {
//     setTheNumber(theNumber + 1);
//   }
//   return (
//     <button type="button" onClick={clickHandler}>Number {theNumber}</button>
//   )
// }

function App() {

  return (

    <div className="App">
      {/* <NavBar logo="AMINGO" location={prop.location.pathname}></NavBar> */}
      <Jumbotron title="Newsletter" lead="Some text here" description="Enter your email address to subscribe to our newsletter" linkLabel="Subscribe"></Jumbotron>
      {/* <Feed></Feed> */}
      {/* <Modal></Modal> */}
      <br></br>
      <br></br>

    </div>

  );
}

export default App;
