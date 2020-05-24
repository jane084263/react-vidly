function solution(N, K) {
  var index;
  var allInCount = 0;
  if (K === 0) {
    index = N - 1;
  } else {
    twoSplit(N, K, allInCount);
  }
}
function twoSplit(N, K, allInCount) {
  let test = Math.floor(N / 2);
  allInCount++;
  if (test * 2 + test == N) {
    console.log(allInCount);
    return allInCount;
  } else {
    twoSplit(N - 1, K, allInCount);
  }
}

solution(8, 0);
