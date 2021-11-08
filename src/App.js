import React from "react";
import {useState} from 'react'
import Navi from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signin from "./Components/Signin.js";

export default function App() {
  const [alert, setalert] = useState(null)
  const showAlert=(Message,Type)=>{
    setalert({
      msg: Message,
      type: Type
    })
    setTimeout(() => {
      setalert(null)
    }, 3000);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navi></Navi>
        <Alert alert={alert}/>
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
          </Route>
          <Route exact path="/About">
            <About></About>
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signin">
            <Signin showAlert={showAlert}></Signin>
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}
