import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square
        onClick={() => this.props.onclick(i, j)}
        value={this.props.square[i][j]}
        disabled={this.props.disabled}
      />
    );
  }
  render() {
    const scope = 20;
    let board = [];
    for (let i = 0; i < scope; i++) {
      board[i] = [];
      for (let j = 0; j < scope; j++) {
        board[i][j] = (
          <div key={`${i}-${j}`} className="square0">
            {this.renderSquare(i, j)}
          </div>
        );
      }
    }
    const boardjsx = board.map((row, index) => (
      <div className="row" key={index}>
        {row}
      </div>
    ));
    return <>{boardjsx}</>;
  }
}
export default Board;
