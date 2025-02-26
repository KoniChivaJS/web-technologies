//task 1
const findMinMax = (arr) => {
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return [min, max];
};

const isNumberBetween = (min, max, number) => {
  let res = true;

  number < min || number > max ? (res = !res) : res;

  return res;
};

const convertMark = (mark) => {
  if (mark < 1 || mark > 5) {
    return "mark must be between 1 and 5";
  }

  return mark == 5
    ? "відмінно"
    : mark >= 4
    ? "добре"
    : mark >= 3
    ? "задовільно"
    : mark >= 2
    ? "незадовільно"
    : "незадовільно";
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(findMinMax(arr));
console.log(isNumberBetween(1, 10, 5));
console.log(convertMark(6));
console.log(convertMark(4));
