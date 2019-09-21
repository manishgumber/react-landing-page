import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';

function App() {

  return (
    <div className="App">      
      <NavBar logo="BBC"></NavBar>
      <Jumbotron title="Newsletter" lead="Some text here" description="Enter your email address to subscribe to our newsletter" linkLabel="Subscribe"></Jumbotron>
    </div>
  );
}

export default App;
