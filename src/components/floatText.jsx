import React, { Component } from "react";
import "./float.scss";

const FloatText = ({ action, open, section }) => {
  let para;

  if (section === "one") {
    para = (
      <p>
        I am a passionate and fun individual who is completely obsessed with
        everything creative! I love to focus on the littles of details and
        always love learning new things. You will always find me doing some
        strange and creative things. Some of my fun lies in the realms of
        Animation, Design, Developing and Dancing. I have LinkedIn too. It
        should tell you more if you would like.
      </p>
    );
  } else if (section === "three") {
    para = (
      <p>
        blah blah blah developer blah blah
        <a href="#" onClick={action}>
          bash
        </a>
      </p>
    );
  }
  return <div className={`floatRight ${open} ${section}`}>{para}</div>;
};

export default FloatText;
