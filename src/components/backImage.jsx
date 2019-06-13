import React from "react";
import "./backImage.scss";

// export default NavBar;
const BackImg = ({ section, open, mySection }) => {
  return (
    <img
      src={require(`../resources/${section}.png`)}
      alt=""
      className={`back-image current-${section} ${mySection} ${open}`}
    />
  );
};

export default BackImg;
