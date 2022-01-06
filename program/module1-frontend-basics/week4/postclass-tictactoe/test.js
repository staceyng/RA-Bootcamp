// const defaultBoard = [
//   [
//     { val: 8, player: "" },
//     { val: 1, player: "" },
//     { val: 6, player: "" },
//   ],
//   [
//     { val: 3, player: "" },
//     { val: 5, player: "" },
//     { val: 7, player: "" },
//   ],
//   [
//     { val: 4, player: "" },
//     { val: 9, player: "" },
//     { val: 2, player: "" },
//   ],
// ];
// let board = JSON.parse(JSON.stringify(defaultBoard));

// board[1][1].player = "CHANGED";
// console.log(defaultBoard);
// console.log(board);

const threeSumCheck = (arr) => {
  // check which player arr can add to 15
  console.log(arr);
  if (arr.length < 3) {
    return false;
  }

  let lp = 0;
  let rp = arr.length - 1;
  const target = 15;
  arr.sort();
  console.log(arr);
  for (let i = 0; i < arr.length; i += 1) {
    lp = i + 1;
    while (lp < rp) {
      const val = arr[i] + arr[lp] + arr[rp];
      if (val < target) {
        // move lp
        lp += 1;
      } else if (val > target) {
        // move rp
        rp -= 1;
      } else {
        // found target
        return true;
      }
    }
  }
  return false;
};

const arr = [5, 9, 6];
console.log(threeSumCheck(arr));
