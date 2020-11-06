import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SuccessPage extends Component {
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-sm bg-light">
          <ul className="navbar-nav">
            <li className="nav-link">
              <Link to="/">
                <i className="fa fa-home"></i>Home
              </Link>
            </li>
          </ul>
        </nav>
        <h3 style={{color:"purple"}}>
          Congratulations You have won a{" "}
          <b style={{ color: "red", fontWeight: "bold", fontSize: "30px" }}>{this.props.match.params.item}</b>{" "}
        </h3>
      </div>
    );
  }
}
