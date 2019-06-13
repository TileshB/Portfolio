import React, { Component } from "react";
import Terminal from "terminal-in-react";
import "./bashScreen.scss";

class BashScreen extends Component {
  showMsg = () => "Hello World";
  gameStart = () =>
    "Welcome to this RPG, youll be read a story and given decisions. to choose an option, type 'choice x' with x being the number";
  helpMsg = () =>
    "Don't bother, no one can hear you.There is no escape (:... Just kidding!:D But for real, just type 'help', no jokes this time";
  state = {
    // gameStart: "false",
    currChoices: []
  };

  constructor(props) {
    super(props);
  }

  currChoice(params) {}

  nextStory(params) {}

  render() {
    return (
      <div className={`terminal-holder ${this.props.classes}`}>
        <Terminal
          // watchConsoleLogging
          color="green"
          backgroundColor="black"
          // hideTopBar={true}
          startState="maximised"
          allowTabs={false}
          promptSymbol="old-school-PC:~$"
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commands={{
            "open-google": () =>
              window.open("https://www.google.com/", "_blank"),
            showmsg: this.showMsg,
            popup: () => alert("Terminal in React"),
            "help-me": this.helpMsg,
            // rpg: {
            //   method: (args, print, runCommand) => {
            //     print(`You choose to walk ${args._[0]} miles`);
            //   },
            //   options: [
            //     {
            //       name: "choice",
            //       description: "what do you choose to do?",
            //       defaultValue: 1
            //     }
            //   ]
            // },
            "lets-play": (args, print, runCommand) => {
              print(
                "You wake up, you know you're going to be the man who wakes up next to him/her, but how far will you walk?\n1. 500 miles\n2. 500 more"
              );
              // runCommand(this.rpg);
            },
            choose: (args, print, runCommand) => {
              const opt = args._[0];
              print(this.currChoice(opt));
              print("");
              print(this.nextStory());
            }
          }}
          descriptions={{
            "open-google": "opens google.com",
            showmsg: "shows a message",
            alert: "alert",
            popup: "alert",
            "help-me": "threaten user :)",
            "lets-play": "start text-based adventure game"
          }}
          msg={`Welcome friends, I am the AI behind this site and this is my home. Don't be afraid to go looking around, I don't... byte :P\nIf you're feeling a bit confused, try typing 'help-me'!`}
        />
      </div>
    );
  }
}

export default BashScreen;
