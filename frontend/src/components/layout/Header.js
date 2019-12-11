import React, { Component } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Navbar } from "react-bulma-components";

export class Header extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="">
              <h1>Skyroof Constructions</h1>
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
