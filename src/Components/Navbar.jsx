import React, {useEffect} from "react"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

let Navi = () => {
  let location= useLocation()
  useEffect(() => {
    console.log(location.pathname)
    },[location]
  )
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid" >
          <Link className="navbar-brand" to="/">
            NotePanda
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item" >
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/" >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/About"? "active": ""}`} to="/About" >
                  About
                </Link>
              </li>
            </ul>
            
              <Link className="btn btn-outline-info mx-1" to="/login" role="button">
                Log In
              </Link>
              <Link className="btn btn-outline-info mx-1" to="/signin" role="button">
                Sign In
              </Link>
            
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navi;
