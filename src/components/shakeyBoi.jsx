import React, { Component } from "react";
import ReactAccelerometer from "react-accelerometer";

const ShakeyBoi = () => {
  return (
    <ReactAccelerometer>
      {(position, rotation) => (
        <ul>
          <li>x: {position.x}</li>
          <li>y: {position.y}</li>
          <li>z: {position.z}</li>
          <li>rotation alpha: {rotation.alpha}</li>
          <li>rotation beta: {rotation.beta}</li>
          <li>rotation gamma: {rotation.gamma}</li>
        </ul>
      )}
    </ReactAccelerometer>
  );
};

export default ShakeyBoi;
