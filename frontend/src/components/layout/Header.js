import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Skyroof Constructions</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default Header;
