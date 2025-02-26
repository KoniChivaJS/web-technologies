const sumFibbonacci = (n) => {
  let a = 0,
    b = 1,
    sum = 0,
    count = 0;

  while (count < n) {
    sum += a;
    let temp = a + b;
    a = b;
    b = temp;
    count++;
  }

  return sum;
};

const isProsteChislo = (num) => {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const calculateSumOfPrimes = (n) => {
  let sum = 0;
  for (let i = 2; i <= n; i++) {
    if (isProsteChislo(i)) {
      sum += i;
    }
  }
  return sum;
};

const dayOfWeek = (day) => {
  switch (day) {
    case 1:
      return "Понеділок";
    case 2:
      return "Вівторок";
    case 3:
      return "Середа";
    case 4:
      return "Четвер";
    case 5:
      return "П'ятниця";
    case 6:
      return "Субота";
    case 7:
      return "Неділя";
    default:
      return "Невідомий день";
  }
};

const filterOddLengthStrings = (arr) =>
  arr.filter((str) => str.length % 2 !== 0);

const incrementArray = (arr) => arr.map((num) => num + 1);

const checkSumOrDifference = (a, b) => a + b === 10 || Math.abs(a - b) === 10;

console.log(`Завдання 1: ${sumFibbonacci(10)}`);
console.log(`Завдання 2: ${calculateSumOfPrimes(1000)}`);
console.log(`Завдання 3: ${dayOfWeek(4)}`);
console.log(
  `Завдання 4: ${filterOddLengthStrings(["abc", "asd", "even", "also"])}`
);
console.log(`Завдання 5: ${incrementArray([1, 2, 3, 4, 5])}`);
console.log(`Завдання 6: ${checkSumOrDifference(5, 5)}`);
