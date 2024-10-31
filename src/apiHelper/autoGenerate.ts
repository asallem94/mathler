export function generateExpression(size: number = 6) {
  if (size < 3) {
    throw new Error("you can't have an expression with less than 3 characters");
  }

  let expression = "";
  let availableNumbers = NUMBERS;
  let remainingChar = size;
  let digit = generateDigit(getRandomNum(3));
  expression += digit;
  remainingChar -= digit.length;

  while (remainingChar > 1) {
    // Generate operator
    const operator = generateOperator();
    remainingChar -= 1;
    // Generate digit following operator
    if (operator === "/") {
      availableNumbers = NUMBERS.slice(1, 9).filter(
        (num) => eval(digit) % parseInt(num) === 0
      );
      digit =
        availableNumbers.length > 1 ? generateDigit(1, availableNumbers) : "0";
    } else {
      let numOfDigits = 3;
      if (remainingChar > 4) {
        numOfDigits = getRandomNum(3);
      } else if (remainingChar === 4) {
        numOfDigits = getRandomNum(2);
      } else if (remainingChar === 3) {
        numOfDigits = getRandomNum(2) > 1 ? 3 : 1; // cannot be 2 only 1 or 3
      } else {
        numOfDigits = remainingChar;
      }
      digit = generateDigit(numOfDigits, NUMBERS);
    }
    remainingChar -= digit.length;
    expression += operator + digit;
  }
  if (remainingChar === 1) {
    // retry
    return generateExpression(size);
  }

  // Ensure expression has 6 characters
  while (expression.length < 6) {
    expression += NUMBERS[Math.floor(Math.random() * 10)];
  }

  return expression.slice(0, 6);
}

const OPERATORS = ["+", "-", "*", "/"];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function getRandomNum(maxNum = 3) {
  // Generate first number (1-3 digits)
  const digitGenerator = Math.random();
  const increment = 1 / maxNum + 0.01;
  let i = increment;
  let counter = 1;
  while (i < digitGenerator) {
    i += increment;
    counter += 1;
  }
  return counter;
}

function generateDigit(numOfDigits: number = 3, availableNumbers = NUMBERS) {
  let number = "";
  let i = 0;
  while (i < numOfDigits) {
    if (i === 0 && numOfDigits > 1) {
      // first number can't be zero
      const randomIndex = Math.floor(
        Math.random() * (availableNumbers.length - 1)
      );
      number += availableNumbers.slice(1, availableNumbers.length)[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      number += availableNumbers[randomIndex];
    }
    i += 1;
  }
  return eval(number).toString(); // "012" => "12"
}

function generateOperator() {
  return OPERATORS[Math.floor(Math.random() * 4)];
}
