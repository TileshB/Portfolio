import React, { Component } from "react";
import "./float.scss";
import Social from "./social";
import gif from "../resources/giphy.gif"

const FloatText = ({ action, open, section, triggerHover, offHover, showEmail, hideEmail, showNum, hideNum }) => {
  let para;

  if (section === "one") {
    var innertext = (<span><mark>I</mark> <mark>am</mark> <mark>a</mark> <mark>passionate</mark> <mark>and</mark> <mark>fun</mark> <mark>individual</mark> <mark>who</mark> <mark>is</mark> <mark>completely</mark> <mark>obsessed</mark> <mark>with</mark> <mark>everything</mark> <mark>creative!</mark> <mark>I</mark> <mark>love</mark> <mark>to</mark> <mark>focus</mark> <mark>on</mark> <mark>the</mark> <mark>littlest</mark> <mark>of</mark> <mark>details</mark> <mark>and</mark> <mark>always</mark> <mark>love</mark> <mark>learning</mark> <mark>new</mark> <mark>things.</mark> <mark>I</mark> <mark>also</mark> <mark>truly</mark> <mark>enjoy</mark> <mark>breaking</mark> <mark>techology</mark> <mark>to</mark> <mark>use</mark> <mark>it</mark> <mark>in</mark> <mark>ways</mark> <mark>it</mark> <mark>wasn't</mark> <mark>designed</mark> <mark>to</mark> <mark>be</mark> <mark>used.</mark> <mark>Some</mark> <mark>of</mark> <mark>my</mark> <mark>passions</mark> <mark>lie</mark> <mark>in</mark> <mark>the</mark> <mark>realms</mark> <mark>of</mark> <mark>3D,</mark> <mark>design,</mark> <mark>developing,</mark> <mark>innovating</mark> <mark>and</mark> <mark>dancing.</mark> <mark>I</mark> <mark>have</mark> <mark>LinkedIn</mark> <mark>too.</mark> <mark>It</mark> <mark>should</mark> <mark>tell</mark> <mark>you</mark> <mark>more</mark> <mark>about</mark> <mark>me.</mark></span>);
    para = (
      <div onMouseEnter={triggerHover} onMouseLeave={offHover}>
        <span id="bio">
          {innertext}
        </span>
        <Social />
      </div>
    );
  } else if (section === "three") {
    para = (
      <p className="comingSoon">
        Coming soon... I did make this pretty bad boi though!
      </p>
    );
  } else if(section === "four"){
    para = (
      <div className="contact">
        <h3 className="first-contact">Well hey there!<br/> Want to get in contact, send me a <a href="mailto:tileshb@gmail.com"><span className="mail" onMouseEnter={showEmail} onMouseLeave={hideEmail}>mail <span className="brckt">(tileshb@gmail.com)</span></span></a>!</h3>
        <h3 className="first-contact">If you really need to, give me a <span className="call" onMouseEnter={showNum} onMouseLeave={hideNum}>call <span className="brckt">(076 823 2169)</span></span>. Be warned, I am introverted and anxious!</h3>
        {/* <img className="sup" src={gif} alt=""/> */}
      </div>
    )
  }
  return <div className={`floatRight ${open} ${section}`}>{para}</div>;
};

export default FloatText;
