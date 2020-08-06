import React, { Component } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import "./devShowcase.scss";
import img1MTN from "../resources/showcase/MTN/img1.jpg";
import img2MTN from "../resources/showcase/MTN/img2.jpg";
import img3MTN from "../resources/showcase/MTN/img3.png";
import img4MTN from "../resources/showcase/MTN/img4.jpg";
import img5MTN from "../resources/showcase/MTN/img5.jpg";
const domEle = document.getElementById("image-section")
class DevShowcase extends Component {
  state = { notable: "", banners: "", landing: "", emailers: "", lang: "" };
  componentDidMount() {
    var tempNotable =
      "Emoji day AR Filter, Springbok WC filter, MTN TADHACK codebreak challange";
    var _banners = "+1000";
    var _landing = "+50";
    var _emailers = "+50";
    var _lang =
      "HTML, CSS, SCSS, JS, SPARK AR, Photoshop, Google Studio, Blender3D,Indesign";
    this.setState({
      notable: tempNotable,
      banners: _banners,
      landing: _landing,
      emailers: _emailers,
      lang: _lang,
    });
  }
  render() {
    return (
      <div className="showcase-holder">
        <div className="showcase-section">
          <div className="writeup">
            <h2 className="showcase-title">NOTABLE</h2>
            <p className="showcase-text">{this.state.notable}</p>
            <br />
            <br />
            <h2 className="showcase-title">FUNDAMENTALS</h2>
            <p className="showcase-text">
              Web banners: {this.state.banners}
              <br />
              Landing pages: {this.state.landing}
              <br />
              Emailers: {this.state.emailers}
            </p>
            <br />
            <br />
            <h2 className="showcase-title">LANGUAGES/ PROGRAMS</h2>
            <p className="showcase-text">{this.state.lang}</p>
          </div>
          <ParallaxProvider scrollContainer={domEle}>
          <div id="image-section" className="image-section">
              <Parallax
                offsetYMax={1000}
                offsetYMin={-1000}
                className="hemi-left"
                slowerScrollRate={true}
              >
                <img src={img1MTN} alt="" />
              </Parallax>
              <Parallax offsetYMax={30} offsetYMin={-30} className="hemi-right">
                <img src={img2MTN} alt="" />
              </Parallax>
            </div>
          </ParallaxProvider>
        </div>
      </div>
    );
  }
}

export default DevShowcase;
