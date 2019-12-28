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

  handleClicking(section, e){
    this.toggleMenu()
    this.props.onHover(section)
    console.log("yup")
  }

  render() {
    return (
      <div>
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
            // onMouseOver={e => console.log("Bottom bun all day!")}
            src={require("../resources/icons/solid-burger/4x/bottom.png")}
            alt=""
          />
        </a>
        <div className={`nav-list ${this.state.open}`}>
          <a className="nav-item left" onClick={e =>this.handleClicking(0, e)} onMouseOver={e => this.props.onHover(0)} >Tilesh</a>
          <a className="nav-item left" onClick={e =>this.handleClicking(1, e)} onMouseOver={e => this.props.onHover(1)} >Design</a>
          <a className="nav-item right" onClick={e =>this.handleClicking(2, e)} onMouseOver={e => this.props.onHover(2)}>Develop</a>
          <a className="nav-item right">Contact</a>
        </div>
      </div>
    );
  }
}

export default Hamburger;
