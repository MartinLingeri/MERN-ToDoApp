import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";

const Navigation = () => {
  const [navVisibility, setVisibility] = useState(false);
  const [barIcon, setBarIcon] = useState(faBars);

  const barsClick = () => {
    setVisibility(!navVisibility);
    if (barIcon === faBars) {
      setBarIcon(faXmark);
    } else {
      setBarIcon(faBars);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand link" to="/">
          <FontAwesomeIcon
            className="memo-icon" 
            icon={faNoteSticky} 
            size="lg"
          />
          <span>
            ToDoApp
          </span>
        </Link>
        <FontAwesomeIcon
          className="navbar-toggler"
          type="button"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          icon={barIcon}
          size="lg"
          onClick={() => barsClick()}
        />
        <div id="navbar-collapse" className="navbar-collapse">
          <ul className="navbar-ul" data-visible={navVisibility.toString()}>
            <li className="navbar-item">
              <Link to="/" className="nav-link link">
                Notes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createNote" className="nav-link link">
                Create Note
              </Link>
            </li>
            {/* <li className="navbar-item">
              <Link to="/createUser" className="nav-link link">
                Sign In
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
