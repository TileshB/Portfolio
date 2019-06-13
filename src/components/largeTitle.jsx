import React from "react";
import "./largeTitle.scss";

const LargeTitle = ({ action, open, title, section }) => {
  return (
    <a href="#" onClick={action} className={`title ${section} ${open}`}>
      {title}
    </a>
  );
};

export default LargeTitle;
