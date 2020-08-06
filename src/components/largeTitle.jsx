import React from "react";
import "./largeTitle.scss";

const LargeTitle = ({ action, open, title, section, triggerHover, offHover }) => {

  return (
    <a href="#" onClick={action} onMouseEnter={triggerHover} onMouseLeave={offHover}  className={`title link ${section} ${open}`}>
      {title}
    </a>
  );
};

export default LargeTitle;
