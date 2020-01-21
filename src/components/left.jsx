import React, { Component } from "react";
import "./full.scss";

class Left extends Component {
  render() {
    let imageLeft = "";
    if (this.props.section == "one") {
      imageLeft = (
        <img
          className="leftImg"
          src={require(`../resources/${this.props.image}.jpg`)}
          alt=""
        />
      );
    }

    return <div className={`half ${this.props.open}`}>{imageLeft}</div>;
  }
}

export default Left;
