import "./style.css";
import React, { Component } from "react";
import Board from "./board";

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
