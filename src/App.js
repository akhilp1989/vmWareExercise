import React from 'react';
import './App.css';
import { Link,Route } from 'react-router-dom'
import Report from './Components/Report-component'
import HomePage from './Components/HomePage-component'


function App() {
  return (
    <div className="App">
      <header className="App-header">
     
      <Route exact path='/' component={HomePage} />
     <Route path='/viewReport' component={Report}/>
     
      </header>
    </div>
  );
}

export default App;
