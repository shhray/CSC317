// value that is currently shown on the display
let currentValue = "0";
// last number we stored before pressing an operator
let previousValue = null;
// which operator we picked (add, subtract, etc)
let currentOperator = null;
// flag to know if we are starting a new number
let isNewEntry = true;

// memory value for extra credit (M+, M-, MR, MC)
let memoryValue = 0;

const displayElement = document.getElementById("display");
const memoryIndicator = document.getElementById("memory-indicator");
const themeToggleButton = document.getElementById("themeToggle");

// update the calculator screen
function updateDisplay() {
  displayElement.textContent = currentValue;
}

// show "M" indicator when memory is not zero
function updateMemoryIndicator() {
  if (!memoryIndicator) return;
  if (memoryValue !== 0) {
    memoryIndicator.textContent = "M";
    memoryIndicator.classList.add("active");
  } else {
    memoryIndicator.textContent = "";
    memoryIndicator.classList.remove("active");
  }
}

// handle when we click or type a digit
function handleNumber(numStr) {
  // if this is a fresh start or we had just 0, replace it
  if (isNewEntry || currentValue === "0") {
    currentValue = numStr;
    isNewEntry = false;
  } else {
    // otherwise just add the digit to the end
    currentValue += numStr;
  }
  updateDisplay();
}

// handle decimal point
function handleDecimal() {
  // start a new decimal number like "0."
  if (isNewEntry) {
    currentValue = "0.";
    isNewEntry = false;
  } else if (!currentValue.includes(".")) {
    // only add one decimal point
    currentValue += ".";
  }
  updateDisplay();
}

// run the math based on current operator and values
function performOperation() {
  // if we do not have enough info, skip
  if (previousValue === null || currentOperator === null) return;

  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);

  let result;

  switch (currentOperator) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      // simple division by zero guard
      if (b === 0) {
        currentValue = "Error";
        previousValue = null;
        currentOperator = null;
        isNewEntry = true;
        updateDisplay();
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  // show the result and reset state
  currentValue = String(result);
  previousValue = null;
  currentOperator = null;
  isNewEntry = true;
  updateDisplay();
}

// when user picks an operator (+, -, etc)
function handleOperator(op) {
  // finish pending math if we already have a previous value
  if (!isNewEntry) {
    if (previousValue !== null && currentOperator !== null) {
      performOperation();
      // use the result as the new previousValue
      previousValue = currentValue;
    } else {
      // first time pressing an operator, just store current
      previousValue = currentValue;
    }
  }
  currentOperator = op;
  isNewEntry = true;
}

// AC button resets everything
function handleClear() {
  currentValue = "0";
  previousValue = null;
  currentOperator = null;
  isNewEntry = true;
  updateDisplay();
}

// +/- button flips the sign
function handleToggleSign() {
  // do not change 0 or error
  if (currentValue === "0" || currentValue === "Error") return;

  if (currentValue.startsWith("-")) {
    currentValue = currentValue.slice(1);
  } else {
    currentValue = "-" + currentValue;
  }
  updateDisplay();
}

// % button turns current value into a percentage
function handlePercent() {
  const value = parseFloat(currentValue);
  if (isNaN(value)) return;
  currentValue = String(value / 100);
  updateDisplay();
}

// = button triggers the operation
function handleEquals() {
  performOperation();
}

// memory clear: set memory back to 0
function handleMemoryClear() {
  memoryValue = 0;
  updateMemoryIndicator();
}

// memory recall: show memory on screen
function handleMemoryRecall() {
  if (memoryValue === 0) return;
  currentValue = String(memoryValue);
  isNewEntry = true;
  updateDisplay();
}

// memory plus: add current value to memory
function handleMemoryPlus() {
  const value = parseFloat(currentValue);
  if (isNaN(value)) return;
  memoryValue += value;
  updateMemoryIndicator();
}

// memory minus: subtract current value from memory
function handleMemoryMinus() {
  const value = parseFloat(currentValue);
  if (isNaN(value)) return;
  memoryValue -= value;
  updateMemoryIndicator();
}

// wire up number buttons
document.querySelectorAll(".btn-number").forEach((button) => {
  button.addEventListener("click", () => {
    const num = button.getAttribute("data-number");
    const action = button.getAttribute("data-action");

    // if button has a number, treat it as digit input
    if (num !== null) {
      handleNumber(num);
    }
    // if this is the decimal button
    if (action === "decimal") {
      handleDecimal();
    }
  });
});

// wire up utility buttons (AC, +/-, %, memory keys)
document.querySelectorAll(".btn-utility").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");

    if (action === "clear") handleClear();
    if (action === "toggle-sign") handleToggleSign();
    if (action === "percent") handlePercent();
    if (action === "mc") handleMemoryClear();
    if (action === "mr") handleMemoryRecall();
    if (action === "mplus") handleMemoryPlus();
    if (action === "mminus") handleMemoryMinus();
  });
});

// wire up operator buttons (+, -, ×, ÷, =)
document.querySelectorAll(".btn-operator").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");

    if (action === "equals") {
      handleEquals();
    } else {
      handleOperator(action);
    }
  });
});

// keyboard support so we can type instead of clicking
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // handle digits 0 to 9
  if (!isNaN(key) && key !== " ") {
    handleNumber(key);
  } else if (key === ".") {
    handleDecimal();
  } else if (key === "+") {
    handleOperator("add");
  } else if (key === "-") {
    handleOperator("subtract");
  } else if (key === "*" || key.toLowerCase() === "x") {
    handleOperator("multiply");
  } else if (key === "/") {
    handleOperator("divide");
  } else if (key === "Enter" || key === "=") {
    // avoid weird default behavior on Enter
    event.preventDefault();
    handleEquals();
  } else if (key.toLowerCase() === "c") {
    handleClear();
  } else if (key === "%") {
    handlePercent();
  }
});

// theme toggle between dark and light
if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
    const body = document.body;

    // simple class swap for the two themes
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    }
  });
}

// set up initial view
updateDisplay();
updateMemoryIndicator();
