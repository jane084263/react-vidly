import "./style.css";
import React, { Component } from "react";
import { SD, getRandom } from "./utils";

const sudoku = new SD();

class Board extends React.Component {
  state = {
    sudokuArr: [], // 数独完整数组
    blankArr: [], // 空数组坐标
    splicedArr: [], // 删除数组坐标和值
    filledArr: [], // 填入数据的数组
  };
  componentDidMount() {
    this.generateArr();
  }

  generateArr() {
    sudoku.init(30);
    const { sdArr, backupSdArr } = sudoku;
    console.log("sdArr", sdArr);
    this.setState({
      sudokuArr: sdArr,
      backArr: backupSdArr,
    });
    this.createBlank(sdArr, 10);
  }
  createBlank(arr, num) {
    //生成指定数量的空白格子的坐标。
    let blankArr, sudokuArr, splicedArr, blankSet;
    sudokuArr = arr || [];
    blankArr = [];
    splicedArr = [];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    do {
      let x, y;
      x = numArr[getRandom(8) - 1];
      y = numArr[getRandom(6) - 1];
      blankArr.push([x, y]);
      blankSet = new Set(blankArr);
    } while (blankSet.size < num);
    blankArr = this.getUnique(blankArr);
    let tempArr;
    tempArr = [];
    blankArr.forEach((sonArr, idx) => {
      let x = sonArr[0];
      let y = sonArr[1];
      let temp = [];
      let val;
      let xArr = sudokuArr[x];
      val = xArr.splice(y, 1, " ");
      temp.push(x, y, val[0]);
      tempArr.push(temp);
      splicedArr = tempArr;
    });
    console.log("blankSet", blankSet);
    console.log("splicedArr", splicedArr);
    this.setState({
      sudokuArr: sudokuArr,
      splicedArr: splicedArr,
      blankArr: blankArr,
    });
  }

  getUnique(array) {
    let obj = {};
    return array.filter((item, index) => {
      // 防止key重复
      let newItem = item + JSON.stringify(item);
      return obj.hasOwnProperty(newItem) ? false : (obj[newItem] = true);
    });
  }
  handleChange(event, xIdx, yIdx) {
    if (event.target.value > 9) {
      alert("请填写1-9的数据");
      return;
    }
    let sudokuArr = this.state.sudokuArr.slice();
    let filledArr = this.state.filledArr.slice();
    let blankArr = this.state.blankArr.slice();
    blankArr.forEach((item, idx) => {
      if (item[0] == xIdx && item[1] == yIdx) {
        if (sudokuArr[xIdx][yIdx]) {
          sudokuArr[xIdx][yIdx] = "";
        }
        sudokuArr[xIdx][yIdx] = event.target.value.trim();
        filledArr.push([xIdx, yIdx, event.target.value]);
      }
    });
    console.log("filledArr", filledArr);
    console.log("blankArr", blankArr);
    this.setState({ sudokuArr, filledArr });
  }

  handleVerify() {
    // 校验检查有错误
    let splicedArr = this.state.splicedArr.slice();
    let filledArr = this.state.filledArr.slice();
    filledArr.forEach((filled) => {
      splicedArr.forEach((spliced) => {
        if (filled[0] == spliced[0] && filled[1] == spliced[1]) {
          if (!filled[2] == spliced[2]) {
            alert(`第${filled[0] + 1}行第第${filled[1] + 1}列有错误`);
          }
        }
      });
    });
  }

  handleShowResult() {
    console.log(1);
    let arr = this.state.splicedArr.slice();
    let sudokuArr = this.state.sudokuArr.slice();
    console.log("this.state.blankArr", this.state.blankArr);
    console.log("this.state.splicedArr", this.state.splicedArr);
    arr.forEach((item) => {
      let x = item[0];
      let y = item[1];
      let val = item[2];
      sudokuArr[x][y] = val;
    });
    this.setState({
      sudokuArr,
    });
  }

  render() {
    const { sudokuArr } = this.state;
    return (
      <div>
        {sudokuArr.map((colArr, xIdx) => {
          return (
            <div className="board-row" key={xIdx}>
              {colArr.map((colval, yIdx) => {
                let key = [xIdx, yIdx].join("");
                return (
                  <input
                    className="square"
                    type="number"
                    key={key}
                    name={key}
                    value={colval}
                    onChange={(event) => {
                      this.handleChange(event, xIdx, yIdx);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
        <div className="btnRow">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              this.generateArr();
            }}
          >
            重新生成
          </button>
        </div>
        <div className="btnRow">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              this.handleVerify();
            }}
          >
            验证
          </button>
        </div>
        <div className="btnRow">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              this.handleShowResult();
            }}
          >
            显示正确结果
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
