import React, { Component } from "react";
import "./cursor.scss";

const root = document.querySelector("html");

class Cursor extends Component {
  state = {};

  constructor(props) {
    super(props);


  }

  componentDidMount(){
    root.addEventListener("mousemove", e => {
        this.setPosition(document.getElementById("cursor"), e);
        this.setPosition(document.getElementById("follower"), e);
      });
  }

  setPosition(element, e) {
    element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }

  render() {
    return (
      <div>
        <div id="cursor" className={`cursor ${this.props.hover} ${this.props.open}`}><span className={`close ${this.props.section} ${this.props.hover} ${this.props.open}`}>X</span></div>
        <div id="follower" className="cursor cursor__follower"></div>
      </div>
    );
  }
}

export default Cursor;
