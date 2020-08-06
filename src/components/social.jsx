import React from "react";
import "./social.scss";

const Social = () => {
//   var linkedinImage = {
//     background: "url(" + require("../resources/icons/social/linkedin.svg") + ") no-repeat center center"
//   };
//   var instaImage = {
//     background: "url(" + require("../resources/icons/social/insta.svg") + ") no-repeat center center"
//   };
  return (
    <div className="links">
      <a target="_blank" href="https://za.linkedin.com/in/tilesh-bhaga-a27258115" >
        <img id="linkedin" src={require("../resources/icons/social/linkedin-dark.svg")} className="link-item" />
      </a>
      <a target="_blank" href="https://www.instagram.com/tilesh_bhaga/">
        <img id="Instagram" src={require("../resources/icons/social/insta-dark.svg")}  className="link-item" />      
        </a>
    </div>
  );
};

export default Social;
