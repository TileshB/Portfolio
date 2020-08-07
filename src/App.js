import React from "react";
import "./App.scss";
import FullHeight from "./components/full";

function App() {
  var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var visible = vis(); // gives current state

vis(function(){
  document.title = vis() ? 'Welcome Stranger' : 'Dont leave!';
}); 

  return (
    <div className="App">
      <FullHeight />
    </div>
  );
}

export default App;
