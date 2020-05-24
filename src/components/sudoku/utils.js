function SD() {
  this.sdArr = []; //生成的数独数组
  this.errorArr = []; //错误的格子。
  this.blankNum = 30; //空白格子数量
  this.backupSdArr = []; //数独数组备份。
  this.blankArr = [];
  this.splicedArr = [];
}

SD.prototype = {
  constructor: SD,
  init: function (blankNum) {
    var beginTime = new Date().getTime();
    this.createSdArr();
    console.log(
      "数独生成完毕，耗时：" +
        (new Date().getTime() - beginTime) / 1000 +
        "秒！"
    );
    // this.blankNum = this.setLevel() || blankNum || this.blankNum;
    // this.createBlank(10);
    // this.createBlankCells();
  },
  reset: function () {
    //重置程序。
    this.errorArr = [];
    var beginTime = new Date().getTime();
    this.createSdArr();
    console.log(
      "数独生成完毕，耗时：" +
        (new Date().getTime() - beginTime) / 1000 +
        "秒！"
    );
    this.blankNum = this.setLevel() || this.blankNum;
    this.createBlank(8);
    // this.createBlankCells();
  },
  again: function () {
    //重玩本局
    this.errorArr = [];
    // this.createBlankCells();
  },
  setLevel: function () {
    //用户输入难度。
    let num = 9;
    return num;
  },
  createSdArr: function () {
    //生成数独数组。
    var that = this;
    this.sdArr = [];
    this.setThird(2, 2);
    this.setThird(5, 5);
    this.setThird(8, 8);
    var allNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    outerfor: for (var i = 1; i <= 9; i++) {
      innerfor: for (var j = 1; j <= 9; j++) {
        if (this.sdArr[parseInt(i + "" + j)]) {
          continue innerfor;
        }
        var XArr = this.getXArr(j, this.sdArr);
        var YArr = this.getYArr(i, this.sdArr);
        var thArr = this.getThArr(i, j, this.sdArr);
        var arr = getConnect(getConnect(XArr, YArr), thArr);
        var ableArr = arrMinus(allNum, arr);

        if (ableArr.length == 0) {
          this.createSdArr();
          return;
          break outerfor;
        }

        var item;
        let count = 0;
        //如果生成的重复了就重新生成。
        do {
          item = ableArr[getRandom(ableArr.length) - 1];
          count++;
        } while (arr.includes(item) && count <= 1000);
        this.sdArr[parseInt(i + "" + j)] = item;
      }
    }
    let storeArr;
    storeArr = this.formatArr(this.sdArr);
    this.sdArr = storeArr;
    this.backupSdArr = this.sdArr.slice();
    // console.log("this.sdArr", this.sdArr);
  },
  formatArr: function (arr) {
    arr = arr.filter((val) => {
      return val;
    });
    let tempArr = [];
    for (let i = 0; i < 9; i++) {
      tempArr.push(arr.splice(0, 9));
    }
    return tempArr;
  },
  getXArr: function (j, sdArr) {
    //获取所在行的值。
    var arr = [];
    for (var a = 1; a <= 9; a++) {
      if (this.sdArr[parseInt(a + "" + j)]) {
        arr.push(sdArr[parseInt(a + "" + j)]);
      }
    }
    return arr;
  },
  getYArr: function (i, sdArr) {
    //获取所在列的值。
    var arr = [];
    for (var a = 1; a <= 9; a++) {
      if (sdArr[parseInt(i + "" + a)]) {
        arr.push(sdArr[parseInt(i + "" + a)]);
      }
    }
    return arr;
  },
  getThArr: function (i, j, sdArr) {
    //获取所在三宫格的值。
    var arr = [];
    var cenNum = this.getTh(i, j);
    var thIndexArr = [
      cenNum - 11,
      cenNum - 1,
      cenNum + 9,
      cenNum - 10,
      cenNum,
      cenNum + 10,
      cenNum - 9,
      cenNum + 1,
      cenNum + 11,
    ];
    for (var a = 0; a < 9; a++) {
      if (sdArr[thIndexArr[a]]) {
        arr.push(sdArr[thIndexArr[a]]);
      }
    }
    return arr;
  },
  getTh: function (i, j) {
    //获取所在三宫格的中间位坐标。
    var cenArr = [22, 52, 82, 25, 55, 85, 28, 58, 88];
    var index = (Math.ceil(j / 3) - 1) * 3 + Math.ceil(i / 3) - 1;
    var cenNum = cenArr[index];
    return cenNum;
  },
  setThird: function (i, j) {
    //为对角线上的三个三宫格随机生成。
    var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let sortOrder = Math.random() - 0.5 > 0 ? -1 : 1;
    var sortedNumArr = numArr.sort(function () {
      return sortOrder;
    });
    var cenNum = parseInt(i + "" + j);
    var thIndexArr = [
      cenNum - 11,
      cenNum - 1,
      cenNum + 9,
      cenNum - 10,
      cenNum,
      cenNum + 10,
      cenNum - 9,
      cenNum + 1,
      cenNum + 11,
    ];
    for (var a = 0; a < 9; a++) {
      this.sdArr[thIndexArr[a]] = sortedNumArr[a];
    }
  },
  createBlank: function (num) {
    //生成指定数量的空白格子的坐标。
    this.blankArr = []; //生成空白的数组
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < num; i++) {
      let x, y, tempArr;
      x = numArr[getRandom(9) - 1];
      y = numArr[getRandom(6) - 1];
      this.blankArr.push([x, y]);
      tempArr = [];
      this.blankArr.forEach((sonArr, idx) => {
        let x = sonArr[0];
        let y = sonArr[1];
        let temp = [];
        let val;
        // console.log("this.sdArr[x]", this.sdArr[x]);
        val = this.sdArr[x].splice(y, 1, "")[0];
        // console.log("valvalval", val);
        temp.push(x, y, val);
        tempArr.push(temp);
      });
      // console.log("tempArr", tempArr);
      // this.blankArr.forEach((itemArr, idx) => {
      //   this.splicedArr.push([itemArr[0], itemArr[1], this.sdArr[0][1]]);
      // });
      this.splicedArr = tempArr;
      console.log("this.splicedArr", this.splicedArr);
    }
  },
  checkRes: function () {
    //检测用户输入结果。检测前将输入加入数组。检测单个的时候将这一个的值缓存起来并从数组中删除，检测结束在赋值回去。
    var blankArr = this.blankArr,
      len = this.blankArr.length,
      x,
      y,
      dom,
      done,
      temp;
    this.getInputVals();
    this.errorArr.length = 0;
    for (var i = 0; i < len; i++) {
      x = parseInt(blankArr[i] / 10);
      y = blankArr[i] % 10;
      temp = this.backupSdArr[blankArr[i]];
      this.backupSdArr[blankArr[i]] = undefined;
      this.checkCell(x, y);
      this.backupSdArr[blankArr[i]] = temp;
    }
    done = this.isAllInputed();
    if (this.errorArr.length == 0 && done) {
      alert("you win!");
    } else {
      if (!done) {
        alert("你没有完成游戏！");
      }
      this.showErrors();
    }
  },
  checkCell: function (i, j) {},
  getInputVals: function () {},
  isAllInputed: function () {
    //检测是否全部空格都有输入。
    var blankArr = this.blankArr,
      len = this.blankArr.length,
      i,
      x,
      y,
      dom;
    return true;
  },
  showErrors: function () {},
};

//生成随机正整数
export function getRandom(n) {
  return Math.floor(Math.random() * n + 1);
}

//两个简单数组的并集。
export function getConnect(arr1, arr2) {
  var i,
    len = arr1.length,
    resArr = arr2.slice();
  for (i = 0; i < len; i++) {
    if (!arr2.includes(arr1[i])) {
      resArr.push(arr1[i]);
    }
  }
  return resArr;
}

//两个简单数组差集，arr1为大数组
export function arrMinus(arr1, arr2) {
  var resArr = [],
    len = arr1.length;
  for (var i = 0; i < len; i++) {
    if (!arr2.includes(arr1[i])) {
      resArr.push(arr1[i]);
    }
  }
  return resArr;
}

export { SD };
