const random = (len) => Math.floor(Math.random() * (len));

const lotteryNumbers = new Array(49).fill(null).map((_, i) => i + 1);

const shuffleArray = (array) => {
  const arr = array.slice()
  for (let len = arr.length - 1; len > 0; len--) {
    const rand = random(len + 1);
    [arr[len], arr[rand]] = [arr[rand], arr[len]];
  }
  return arr;
}

const drawNumbers = (array, numbers = []) => {
  const NUMBERS_IN_LINE = 6;
  const arr = array.slice();
  const rand = random(arr.length + 1);
  const selected = arr.splice(rand - 1, 1);
  const currentNumbers = numbers.concat([selected[0]]);
  return currentNumbers.length === NUMBERS_IN_LINE ?
    currentNumbers.sort()
    : drawNumbers(arr, currentNumbers);
};

const drawLines = (numOfLines, drawn = []) => {
  const line = drawNumbers(shuffleArray(lotteryNumbers));
  const currentLines = drawn.concat([line]);
  return currentLines.length === numOfLines ? currentLines : drawLines(numOfLines, currentLines);
}

console.log(drawLines(100));
