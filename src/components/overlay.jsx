import React, { Component } from "react";
import "./overlay.scss";

class Overlay extends Component {
  state = {
    interest: {
      one: "Big duck energy",
      two: "UUDDLRLRBA&#9166;",
      three: "01101000 01100101 01101100 01101100 01101111"
    },
    number: {
      one: "001",
      two: "002",
      three: "003"
    },
    date: ""
  };

  componentDidMount() {
    this.getDate();
  }

  getDate() {
    var today = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.date =
      months[today.getMonth()] +
      " " +
      today.getDate() +
      " " +
      today.getFullYear();
    console.log("THIS THAAANG" + this.state.interest[this.props.section]);
    this.setState({ date: this.date });
  }
  render() {
    return (
      <div className="overlay-container">
        <p className="number">{this.state.number[this.props.section]}</p>
        <p className="date lines">
          <span className="holder">
            <div className="side left">{this.state.date}</div>
          </span>
          {/* <span className="lines">&#8212;</span>{" "} */}
        </p>
        <p className="interest lines">
          <span className="holder">
            <div className="side right">
              {this.state.interest[this.props.section]}
            </div>
          </span>
        </p>
      </div>
    );
  }
}

export default Overlay;
