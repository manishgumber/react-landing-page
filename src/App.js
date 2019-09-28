

import React, {useState, createContext, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar2';
import Jumbotron from './Jumbotron';
import ColorButton from './ColorButton';
import Feed from  './Feed';

export const AppContext = createContext();

const MyButton = () =>{
  const [theNumber, setTheNumber] = useState(0);

  const clickHandler=()=>{
    setTheNumber(theNumber+1);
  }
  return(
    <button type="button" onClick={clickHandler}>Number {theNumber}</button>
  )
}

function App() {
  
  const [globalState, setGlobalState] = useState(    
      {
          loggedIn:false,
          userName:'Manish',
          users:[
            'Jim',
            'Jane',
            'Mohammad',
            'Mary'
          ],
          feed: [
            {user: 'Jim', comment: 'This comment is from Jim'},
            {user: 'Jane', comment: 'Going to tennis practice tonight'},
            {user: 'Mohammad', comment: 'Big traffic near downtown dubai'},
            {user: 'Mary', comment: 'Graduating in 1 week! #exicted'}
          ]  
      }
    );

    useEffect(()=>{
      console.log('The global state has changed');
      console.log(globalState.loggedIn);
    })     
    



  return (
    <AppContext.Provider value={[globalState,setGlobalState]}>
        <div className="App">      
          <NavBar logo="BBC"></NavBar>
          <Jumbotron title="Newsletter" lead="Some text here" description="Enter your email address to subscribe to our newsletter" linkLabel="Subscribe"></Jumbotron>

          <Feed></Feed>
          <br></br>
          <br></br>
          {/* {
                globalState.loggedIn &&
                <h1> @{globalState.userName} Feed </h1>
          }
          <MyButton></MyButton>
          <br></br>
          <ColorButton></ColorButton>
          <br></br><br></br> */}
          {/* <ul> */}
          {/* {
            globalState.users.map(
              (name) => {
                return (
                // <li>{ `My name is ${name}` }</li>
                <Feed name={name}></Feed>
                )
              }
              
            )
          } */}
          {/* </ul> */}
        </div>
    </AppContext.Provider>
  );
}

export default App;
