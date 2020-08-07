import React, { Component } from "react";
import "./overlay.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Overlay extends Component {
  state = {
    interest: {
      one: "Big duck energy",
      two: "UUDDLRLRBA&#9166;",
      three: "01101000 01100101 01101100 01101100 01101111",
      four: "Hey there!",
    },
    number: {
      one: "1",
      two: "2",
      three: "3",
      four: "4",
    },
    date: "",
  };

  componentDidMount() {
    this.getDate();
  }

  componentDidUpdate() {
    // //console.log("There was a change!!!");
    if (this.props.open == "open") {
      if (this.props.section == "two") {
        if (this.state.interest["two"] == "UUDDLRLRBA&#9166;") {
          this.setState({
            interest: {
              one: "Big duck energy",
              two: "My gallery",
              three: "01101000 01100101 01101100 01101100 01101111",
              four: "Hey there!",
            },
          });
        }
      }
    } else {
      if (this.props.section == "two") {
        if (this.state.interest["two"] != "UUDDLRLRBA&#9166;") {
          this.setState({
            interest: {
              one: "Big duck energy",
              two: "UUDDLRLRBA&#9166;",
              three: "01101000 01100101 01101100 01101100 01101111",
              four: "Hey there!",
            },
          });
        }
      }
    }
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
      "December",
    ];
    this.date =
      months[today.getMonth()] +
      " " +
      today.getDate() +
      " " +
      today.getFullYear();
    // //console.log("THIS THAAANG" + this.state.interest[this.props.section]);
    this.setState({ date: this.date });
  }
  render() {
    return (
      <div
        className={`overlay-container ${this.props.section} ${this.props.open}`}
      >
        <p className="number">00{this.state.number[this.props.section]}</p>
        <div className="date lines">
          <span className="holder">
            <div className="side left">{this.state.date}</div>
          </span>
          {/* <span className="lines">&#8212;</span>{" "} */}
        </div>
        <div className="interest lines">
          <span className="holder">
            {/* <TransitionGroup>
              <CSSTransition
                key={this.props.section}
                classNames="example"
                timeout={{ enter: 500, exit: 300 }}
              > */}
            <div className="side right">
              {this.state.interest[this.props.section]}
            </div>
            {/* </CSSTransition>
            </TransitionGroup> */}
          </span>
        </div>
      </div>
    );
  }
}

export default Overlay;
