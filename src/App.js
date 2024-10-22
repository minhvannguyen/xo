import "./App.css";
import Board from "./Board";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(20)
            .fill(null)
            .map(() => Array(20).fill(null)),
        },
      ],
      nextPlayer: true,
      step: 0,
      winner: null,
    };
  }
  CaculatorWiner(squares, i, j) {
    let xo = squares[i][j];

    // Kiểm tra theo hàng ngang
    let dem1 = 0;
    for (let n = Math.max(0, j - 4); n <= Math.min(19, j + 4); n++) {
      if (squares[i][n] === xo) {
        dem1++;
        if (dem1 === 5) return xo; // Có người thắng
      } else dem1 = 0;
    }

    // Kiểm tra theo hàng dọc
    let dem2 = 0;
    for (let m = Math.max(0, i - 4); m <= Math.min(19, i + 4); m++) {
      if (squares[m][j] === xo) {
        dem2++;
        if (dem2 === 5) return xo;
      } else dem2 = 0;
    }

    // Kiểm tra đường chéo từ trên trái xuống dưới phải
    let dem3 = 0;
    for (let m = i - 4, n = j - 4; m <= i + 4 && n <= j + 4; m++, n++) {
      if (m >= 0 && n >= 0 && m < 20 && n < 20) {
        if (squares[m][n] === xo) {
          dem3++;
          if (dem3 === 5) return xo;
        } else dem3 = 0;
      }
    }

    // Kiểm tra đường chéo từ dưới trái lên trên phải
    let dem4 = 0;
    for (let m = i - 4, n = j + 4; m <= i + 4 && n >= j - 4; m++, n--) {
      if (m >= 0 && n >= 0 && m < 20 && n < 20) {
        if (squares[m][n] === xo) {
          dem4++;
          if (dem4 === 5) return xo;
        } else dem4 = 0;
      }
    }

    return null; // Không có người thắng
  }
  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const square = current.squares.map((row) => row.slice()); // Sao chép mảng 2 chiều
    if (square[i][j]) {
      return;
    }
    square[i][j] = this.state.nextPlayer ? "X" : "O";
    const winner = this.CaculatorWiner(square, i, j);
    if (winner) {
      this.setState({ winner: winner });
    }

    this.setState({
      history: history.concat([{ squares: square }]),
      step: history.length,
      nextPlayer: !this.state.nextPlayer,
    });
  }

  jumback() {
    let step = this.state.step;
    if (step === 0) return;
    this.setState({
      step: this.state.step - 1,
      nextPlayer: !this.state.nextPlayer,
    });
  }
  jumback0() {
    this.setState({
      history: [
        {
          squares: Array(20)
            .fill(null)
            .map(() => Array(20).fill(null)),
        },
      ],
      step: 0,
      winner: null,
      nextPlayer: !this.state.nextPlayer,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    let status = this.state.winner
      ? `WINNER: Trang xinhtu`
      : `player: ${this.state.nextPlayer ? "X" : "O"}`;

    return (
      <>

        <div className="body">
          <div>
            <h1>{status}</h1>
            <Board
              onclick={(i, j) => this.handleClick(i, j)}
              square={current.squares}
              disabled={this.state.winner}
            />

            {this.state.winner && (
              <div className="birthday">
                <div className="winner-overlay">
                  <img
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWR4b2Y1OWZ6cWJ4ODRhMWhiaW5wN3M3ZWdybHhtM21iaWZsY3BwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3ov9k2H0fYDQkJ1qs8/giphy.webp"
                    alt="Happy Birthday"
                  />
                <div>
                <img
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzU1aTNiMHNicnpjZGZrZXhlcjN6djc5bzhiZmV3Z25zNWRucjFiMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o6gE45VxYatFLYYbS/200.webp"
                    alt="Happy Birthday"
                  />
                  <div className="comment">hì sorry e vì chúc muộn!<br />nhưng mà <br />tuổi mới xin chúc e <br />thật nhiều <br />bình yên và nụ cười,<br />
                đặc biệt <br />đạt điểm cao <br />trong các bài kiểm tra <br />cuối môn e nhé!</div>
                </div>
                
              </div>
              </div>
            )}



          </div>
          <div className="ctrTable">
            <button className="buttonback" onClick={() => this.jumback0()}>
              New game
            </button>
            <button className="buttonback" onClick={() => this.jumback()}>
              Back #{this.state.step}
            </button>

          </div>
        </div>
      </>
    );
  }
}

export default App;
