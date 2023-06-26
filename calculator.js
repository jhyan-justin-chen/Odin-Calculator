function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "INF";
  }
  return num1 / num2;
}

function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);

    case "-":
      return subtract(operand1, operand2);

    case "*":
      return multiply(operand1, operand2);

    case "/":
      return divide(operand1, operand2);

    default:
      console.error(
        `operate(${operate}, ${operand1}, ${operand2}) is invalid.`
      );
      return NaN;
  }
}

function updateDisplay() {
  const operand1Display = document.querySelector(".display-firstoperand");
  const operand2Display = document.querySelector(".display-secondoperand");
  const operatorDisplay = document.querySelector(".display-operator");
  operand1Display.textContent = operand1;
  operand2Display.textContent = operand2;
  operatorDisplay.textContent = operator;
}

function numberButtonPressed(pressed) {
  if (!/^[0-9,\.]$/.test(pressed)) {
    console.error(`Invalid button ${pressed} pressed.`);
    return;
  }

  operand2 += pressed;

  updateDisplay();
}

function operatorButtonPressed(pressed) {
  if (!/^[+,\-,*,/]$/.test(pressed)) {
    console.error(`Invalid button ${pressed} pressed.`);
    return;
  }

  if (operand2 === "") {
    operand2 = ans;
  } else if (operator !== "") {
    equalsButtonPressed();
    operand1 = ans;
    operator = pressed;
  } else {
    operator = pressed;
    operand1 = operand2;
    operand2 = "";
  }

  updateDisplay();
}

function clearHistory() {
  const historyDiv = document.querySelector(".display-history");
  historyDiv.replaceChildren("");
}

function clearWorkspace() {
  operand1 = "";
  operator = "";
  operand2 = "";
}

function clearButtonPressed() {
  clearWorkspace();
  clearHistory();
  updateDisplay();
}

function backButtonPressed() {
  if (operand2 !== "") {
    operand2 = operand2.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
    operand2 = operand1;
    operand1 = "";
  } else if (operand1 !== "") {
    operand1 = operand1.slice(0, -1);
  }
  updateDisplay();
}

function addHistoryLine(operator, operand1, operand2, ans) {
  const historyDiv = document.querySelector(".display-history");
  const historyLine = document.createElement("div");
  historyLine.textContent = `${operand1} ${operator} ${operand2} = ${ans}`;
  historyLine.classList.add("display-history-line");
  historyDiv.appendChild(historyLine);
}

function equalsButtonPressed() {
  let num1 = parseFloat(operand1);
  let num2;
  if (isNaN(num1)) {
    console.error("Invalid operands");
    return;
  }
  if (operand2 === "" && ans !== "") {
    num2 = ans;
  } else {
    num2 = parseFloat(operand2);
  }
  if (isNaN(num2)) {
    console.error("Invalid operands");
    return;
  }
  ans = operate(operator, num1, num2);
  if (isNaN(ans)) {
    console.error("Invalid output");
  } else {
    addHistoryLine(operator, num1, num2, ans);
  }
  clearWorkspace();
  updateDisplay();
}

let operand1 = "";
let operator = "";
let operand2 = "";
let ans = "";
