import React, { Component, Suspense } from "react";


import "./full.scss";
import Left from "./left";
import FloatText from "./floatText";
import LargeTitle from "./largeTitle";
import Hamburger from "./hamburger";
import BashScreen from "./bashScreen";
// import ThreeD from "./threeD";
import Overlay from "./overlay";
// import Masonary from "./galleryv3";
import styled from "styled-components";
import BackText from "./backText";
// import Cursor from "./cursor";
import New3D from "./new3D";
import Loading from "./loading"
import DevShowcase from "./devShowcase"

// import Gallery from "./gallery";
// import ShakeyBoi from "./shakeyBoi";
const  Masonary = React.lazy(() => import('./galleryv3'));
const ThreeModelContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  max-width: 2048px;
  max-height: 1080px;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

class FullHeight extends Component {
  state = {
    open: "closed",
    cmd: "closed",
    sections: ["one", "two", "three", "four"],
    section: "one",
    title: "Tilesh",
    titles: ["Tilesh", "Design", "Develop", "Contact"],
    actives: ["active", "hide", "hide", "hide"],
    hover: "not",
    cursorStyle: "standard",
    scroll: true,
    x: 0,
    y: 0,
    keypressArray: [],
    dispEmail: false,
    dispNum: false,
  };

  constructor(props) {
    super(props);

    this.toggleClick1 = this.toggleClick1.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
    this.toggleClickGallery = this.toggleClickGallery.bind(this);
    this.toggleTerminal = this.toggleTerminal.bind(this);
    this.onHover = this.onHover.bind(this);
    this.triggerHover = this.triggerHover.bind(this);
    this.triggerHoverOff = this.triggerHoverOff.bind(this);
    // this.changeCursor = this.changeCursor.bind(this);
    const root = document.querySelector("html");

    // // Real cursor element
    // const cursor = document.createElement("div");
    // cursor.classList.add("cursor", this.state.hover);
    // root.appendChild(cursor);

    // // Following extra cursor element
    // const follower = document.createElement("div");
    // follower.classList.add("cursor", "cursor__follower");
    // root.appendChild(follower);

    // root.addEventListener("mousemove", e => {
    //   setPosition(follower, e);
    //   setPosition(cursor, e);
    // });

    // function setPosition(element, e) {
    //   element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    // }
  }

  componentDidMount() {
    window.addEventListener("keydown", (e) => this.Konami(e));
    var links = document.getElementsByClassName("link");
    //console.log(links);
    for (var x = 0; x < links.length; x++) {
      links[x].addEventListener("onmouseover", function () {
        alert("YEEEEEE");
      });
    }
    // window.addEventListener("scroll", e => this.handleScroll(e));
    // window.addEventListener("wheel", e => this.handleScroll(e));
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

  changeCursor(_style) {
    //console.log(_style);
    if (this.state.cursorStyle !== _style) {
      this.setState({
        cursorStyle: _style,
      });
    }
  }

  toggleClickGallery() {
    if (this.state.open === "open") {
      this.setState({
        open: "closed",
        scale: 16.5,
      });
      //console.log("Cliiiicked");
    }
  }

  toggleClose(e) {
    //console.log(e.target.classList.contains("link-item"));
    if (this.state.section == "one") {
      if (e.target.classList.contains("link-item") !== true) {
        if (this.state.open === "open") {
          this.setState({
            open: "closed",
            scale: 16.5,
          });
          //console.log("Cliiiicked");
        }
      }
    } else if (this.state.section !== "two") {
      if (this.state.open === "open") {
        this.setState({
          open: "closed",
          scale: 16.5,
        });
        //console.log("Cliiiicked");
      }
    }
  }

  toggleClick1() {
    if (this.state.open === "closed") {
      this.setState({
        open: "open",
        scale: 12,
      });
      // //console.log(this.state.scale);
    }
    if (this.state.section !== "two") {
      if (this.state.open === "open") {
        this.setState({
          open: "closed",
          scale: 16.5,
        });
        //console.log("Cliiiicked");
      }
    }
  }

  triggerHover() {
    //console.log("IM IN");
    this.setState({
      hover: "hovering",
    });
  }

  triggerHoverOff() {
    this.setState({
      hover: "not",
    });
  }

  displayEmail = () => {
    this.setState({
      dispEmail: true,
    });
  };

  hideEmail = () => {
    this.setState({
      dispEmail: false,
    });
  };

  displayNum = () => {
    this.setState({
      dispNum: true,
    });
  };

  hideNum = () => {
    this.setState({
      dispNum: false,
    });
  };

  toggleTerminal() {
    //console.log("Clicked!!");
    if (this.state.cmd === "closed") {
      this.setState({
        cmd: "open",
      });
    } else {
      this.setState({
        cmd: "closed",
      });
    }
  }

  handleMouse = (e) => {
    var tempX = e.clientX / window.innerWidth - 0.5;
    var tempY = e.clientY / window.innerHeight - 0.5;
    this.setState({ x: tempX, y: tempY });
    // //console.log(this.state.x, this.state.y);
  };

  Konami = (e) => {
    var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var index = this.state.keypressArray.length;
    if (index < 10) {
      if (e.keyCode == konami[index]) {
        this.setState((prevState) => ({
          keypressArray: [...prevState.keypressArray, e.keyCode],
        }));
        //console.log("okaaaay");
      } else {
        this.setState({ keypressArray: [] });
        //console.log("fucked it");
      }
    }
    index = this.state.keypressArray.length;
    if (index == 10) {
      this.setState({ cmd: "open" });
    }
  };

  handleScroll = (e) => {
    // //console.log("Ready to scroll ", e);
    var tempArray = [];
    var freshArray = [];
    tempArray = this.state.actives.slice();
    freshArray = this.state.actives.slice();
    freshArray[0] = "hide";
    freshArray[1] = "hide";
    freshArray[2] = "hide";
    setTimeout(
      function () {
        this.setState({ scroll: true });
      }.bind(this),
      1000
    );
    if (this.state.scroll) {
      var currSection = 0;
      if (e.deltaY > 10.1) {
        // this.setState({ actives: freshArray });
        currSection = this.getIndex(this.state.section, this.state.sections);
        if (currSection !== 0) currSection = currSection - 1;
        // //console.log(currSection);
        tempArray = freshArray;
        tempArray[currSection] = "active";
        // //console.log(tempArray);
        this.setState({
          section: this.state.sections[currSection],
          title: this.state.titles[currSection],
          actives: tempArray,
        });
        this.setState({ scroll: false });
      } else if (e.deltaY < -10.1) {
        // this.setState({ actives: freshArray });
        currSection = this.getIndex(this.state.section, this.state.sections);
        if (currSection !== this.state.sections.length - 1)
          currSection = currSection + 1;
        tempArray = freshArray;
        tempArray[currSection] = "active";
        // //console.log(currSection);
        // //console.log(tempArray);

        // //console.log("FUUUUUUUCK");
        this.setState({
          section: this.state.sections[currSection],
          title: this.state.titles[currSection],
          actives: tempArray,
        });
        this.setState({ scroll: false });
      }
    }
  };

  onHover(section) {
    var tempArray = [];
    // var freshArray = [];
    // tempArray = this.state.actives.slice();
    // freshArray = this.state.actives.slice();
    // freshArray[0] = "hide";
    // freshArray[1] = "hide";
    // // this.setState({ actives: freshArray });
    // currSection = this.getIndex(this.state.section, this.state.sections);
    // if (currSection !== 0) currSection = currSection - 1;
    // // //console.log(currSection);
    // tempArray = freshArray;
    // tempArray[currSection] = "active";
    // //console.log(tempArray);
    if (section === 0) tempArray = ["active", "hide", "hide", "hide"];
    else if (section === 1) tempArray = ["hide", "active", "hide", "hide"];
    else if (section === 2) tempArray = ["hide", "hide", "active", "hide"];
    else tempArray = ["hide", "hide", "hide", "active"];
    this.setState({
      section: this.state.sections[section],
      title: this.state.titles[section],
      actives: tempArray,
    });
    // this.setState({ scroll: false });

    // this.setState({ actives: freshArray });
    // currSection = this.getIndex(this.state.section, this.state.sections);
    // if (currSection !== this.state.sections.length - 1)
    //   currSection = currSection + 1;
    // tempArray = freshArray;
    // tempArray[currSection] = "active";
    // //console.log(currSection);
    // //console.log(tempArray);

    // //console.log("FUUUUUUUCK");
    this.setState({
      section: this.state.sections[section],
      title: this.state.titles[section],
      actives: tempArray,
    });
    // this.setState({ scroll: false });
  }

  render() {
    return (
      <div
        className={`full ${this.state.section}`}
        // onWheel={this.handleScroll}
        onMouseMove={this.handleMouse}
        onClick={this.toggleClose}
      >
        {/* <Cursor
          hover={this.state.hover}
          open={this.state.open}
          section={this.state.section}
          styling={this.state.cursorStyle}
        /> */}
        <div className="center">
          <div className="transitioner"></div>
          {/* <Loading></Loading> */}
          <BashScreen classes={this.state.cmd} onClose={this.toggleTerminal} />
          {/* <Gallery2 open={this.state.open} section={this.state.section} /> */}
          <Suspense fallback={<div>loading...</div>}>
          <Masonary
            open={this.state.open}
            section={this.state.section}
            closeGallery={this.toggleClickGallery}
            triggerHover={this.triggerHover}
            offHover={this.triggerHoverOff}
          />
          </Suspense>
          {/* <DevShowcase/> */}

          <BackText
            section={this.state.section}
            open={this.state.open}
            email={this.state.dispEmail}
            num={this.state.dispNum}
          />
          {/* <ShakeyBoi /> */}
          <Left
            open={this.state.open}
            image={this.state.title}
            section={this.state.section}
          />
          <FloatText
            section={this.state.section}
            open={this.state.open}
            action={this.toggleTerminal}
            // cursorChange={this.changeCursor}
            // onMouseEnter={this.changeCursor("selectable")}
            triggerHover={this.triggerHover}
            offHover={this.triggerHoverOff}
            showEmail={this.displayEmail}
            hideEmail={this.hideEmail}
            showNum={this.displayNum}
            hideNum={this.hideNum}
          />
          <Overlay section={this.state.section} open={this.state.open} />
          <New3D  section={this.state.section} open={this.state.open} mouseX={this.state.x} mouseY={this.state.y} />
          {/* <Canvas
            concurrent
            gl={{ alpha: true }}
            camera={{ position: [0, 15, 30], fov: 70 }}
            onCreated={({ gl, camera }) => {
              camera.lookAt(0, 0, 0)
              // gl.setClearColor('#fff0ea')
              gl.toneMapping = THREE.Uncharted2ToneMapping
            }}>
            <fog attach="fog" args={['#fff0ea', 10, 60]} />
            <ambientLight intensity={6} /> */}

          {/* </Canvas> */}
          {/* <ThreeModelContainer>
            <ThreeD2
              applyGlitch={true}
              ref={model => (this.model = model)}
              src="https://bernardus.co.za/iamadumbpoes/models/duck/duck.gltf"
              rotationSpeed={{ x: 0.6, y: 0.5 }}
              meshIndex={0}
              cameraPos={{
                x: 0,
                y: 0,
                z: 18,
              }}
              cameraPosResponsive={{
                [1440]: {
                  x: 2,
                  y: 0,
                  z: 15,
                },
              }}
              rotationOffset={{
                x: 0.1,
                y: -0.4,
              }}
            />
          </ThreeModelContainer> */}
          {/* <ThreeD
            mouseX={this.state.x}
            mouseY={this.state.y}
            open={this.state.open}
            section={this.state.section}
            visible={this.state.actives[0]}
            mySection="one"
          />
          <ThreeD
            mouseX={this.state.x}
            mouseY={this.state.y}
            open={this.state.open}
            section={this.state.section}
            visible={this.state.actives[2]}
            mySection="two"
          /> */}
          {/* <BackImg
            section={this.state.section}
            open={this.state.open}
            mySection="one"
          /> */}
          {/* <BackImg
            section={this.state.section}
            open={this.state.open}
            mySection="two"
          /> */}
          {/* <BackImg
            section={this.state.section}
            open={this.state.open}
            mySection="three"
          /> */}
          <LargeTitle
            action={this.toggleClick1}
            open={this.state.open}
            title={this.state.title.toLocaleUpperCase()}
            section={this.state.section}
            triggerHover={this.triggerHover}
            offHover={this.triggerHoverOff}
          />
          <Hamburger
            onHover={this.onHover}
            triggerHover={this.triggerHover}
            offHover={this.triggerHoverOff}
          />
        </div>
      </div>
    );
  }
}

export default FullHeight;
