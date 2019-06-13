import React, { Component } from "react";
import "./hamburger.scss";

class Hamburger extends Component {
  state = { open: "closed" };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    console.log("Menu Clicked!!");
    if (this.state.open === "closed") {
      this.setState({
        open: "open"
      });
    } else {
      this.setState({
        open: "closed"
      });
    }
  }

  render() {
    return (
      <a
        href="#"
        className={`burger ${this.state.open}`}
        onClick={this.toggleMenu}
      >
        <img
          className="ingredient top-bun"
          src={require("../resources/icons/solid-burger/4x/top.png")}
          alt=""
        />
        <img
          className="ingredient medium-done-patty"
          src={require("../resources/icons/solid-burger/4x/middle.png")}
          alt=""
        />
        <img
          className="ingredient bottom-bun"
          src={require("../resources/icons/solid-burger/4x/bottom.png")}
          alt=""
        />
      </a>
    );
  }
}

export default Hamburger;
