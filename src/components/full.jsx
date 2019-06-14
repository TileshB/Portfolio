import React, { Component } from "react";
import "./full.scss";
import Left from "./left";
import FloatText from "./floatText";
import BackImg from "./backImage";
import LargeTitle from "./largeTitle";
import Hamburger from "./hamburger";
import BashScreen from "./bashScreen";
import ThreeD from "./threeD";

class FullHeight extends Component {
  state = {
    open: "closed",
    cmd: "closed",
    sections: ["one", "two", "three"],
    section: "one",
    title: "Tilesh",
    titles: ["Tilesh", "Design", "Develop"],
    scroll: true,
    x: 0,
    y: 0
  };

  constructor(props) {
    super(props);

    this.toggleClick = this.toggleClick.bind(this);
    this.toggleTerminal = this.toggleTerminal.bind(this);
  }

  componentDidMount() {
    // window.addEventListener("scroll", e => this.handleScroll(e));
    window.addEventListener("wheel", e => this.handleScroll(e));
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
  }

  getIndex(value, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  toggleClick() {
    if (this.state.open === "closed") {
      this.setState({
        open: "open",
        scale: 12
      });
      // console.log(this.state.scale);
    } else {
      this.setState({
        open: "closed",
        scale: 16.5
      });
      console.log(this.state.scale);
    }
  }

  toggleTerminal() {
    console.log("Clicked!!");
    if (this.state.cmd === "closed") {
      this.setState({
        cmd: "open"
      });
    } else {
      this.setState({
        cmd: "closed"
      });
    }
  }

  handleMouse = e => {
    var tempX = e.clientX / window.innerWidth - 0.5;
    var tempY = e.clientY / window.innerHeight - 0.5;
    this.setState({ x: tempX, y: tempY });
    // console.log(this.state.x, this.state.y);
  };

  handleScroll = e => {
    // console.log("Ready to scroll ", e);
    setTimeout(
      function() {
        this.setState({ scroll: true });
      }.bind(this),
      1000
    );
    if (this.state.scroll) {
      var currSection = 0;
      if (e.deltaY > 10.1) {
        currSection = this.getIndex(this.state.section, this.state.sections);
        if (currSection !== 0) currSection = currSection - 1;
        console.log(currSection);
        this.setState({
          section: this.state.sections[currSection],
          title: this.state.titles[currSection]
        });
        this.setState({ scroll: false });
      } else if (e.deltaY < -10.1) {
        currSection = this.getIndex(this.state.section, this.state.sections);
        if (currSection !== this.state.sections.length - 1)
          currSection = currSection + 1;
        console.log(currSection);
        console.log("FUUUUUUUCK");
        this.setState({
          section: this.state.sections[currSection],
          title: this.state.titles[currSection]
        });
        this.setState({ scroll: false });
      }
    }
  };

  render() {
    return (
      <div
        className={`full ${this.state.section}`}
        onWheel={this.handleScroll}
        onMouseMove={this.handleMouse}
      >
        <div className="center">
          <BashScreen classes={this.state.cmd} />
          <Left
            open={this.state.open}
            image={this.state.title}
            section={this.state.section}
          />
          <FloatText
            section={this.state.section}
            open={this.state.open}
            action={this.toggleTerminal}
          />
          <ThreeD
            mouseX={this.state.x}
            mouseY={this.state.y}
            open={this.state.open}
            section={this.state.section}
            mySection="one"
          />
          {/* <BackImg
            section={this.state.section}
            open={this.state.open}
            mySection="one"
          /> */}
          <BackImg
            section={this.state.section}
            open={this.state.open}
            mySection="two"
          />
          <BackImg
            section={this.state.section}
            open={this.state.open}
            mySection="three"
          />
          <LargeTitle
            action={this.toggleClick}
            open={this.state.open}
            title={this.state.title.toLocaleUpperCase()}
            section={this.state.section}
          />
          <Hamburger />
        </div>
      </div>
    );
  }
}

export default FullHeight;
