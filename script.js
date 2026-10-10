  const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

let currentNumber = "";
let previousNumber = "";
let operation = null;

function updateDisplay() {
    currentDisplay.textContent = currentNumber || "0";

    if (operation && previousNumber) {
        previousDisplay.textContent = `${previousNumber} ${getOperationSymbol(operation)}`;
    } else {
        previousDisplay.textContent = "";
    }
}

function getOperationSymbol(op) {
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "-") return "−";
    return op;
}

function addNumber(number) {
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (number === "." && currentNumber === "") {
        currentNumber = "0";
    }

    currentNumber += number;
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber === "" && previousNumber !== "") {
        operation = selectedOperation;
        updateDisplay();
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    operation = selectedOperation;
    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}

function calculate() {
    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operation = null;
                updateDisplay();
                return;
            }
            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;

        default:
            return;
    }

    currentNumber = Number(result.toFixed(10)).toString();
    previousNumber = "";
    operation = null;

    updateDisplay();
}

function clearCalculator() {
    currentNumber = "";
    previousNumber = "";
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        addNumber(button.dataset.number);
    });
});

document.querySelectorAll("[data-operation]").forEach(button => {
    button.addEventListener("click", () => {
        chooseOperation(button.dataset.operation);
    });
});

document.querySelector('[data-action="equals"]').addEventListener("click", () => {
    calculate();
});

document.querySelector('[data-action="clear"]').addEventListener("click", () => {
    clearCalculator();
});

document.querySelector('[data-action="delete"]').addEventListener("click", () => {
    deleteNumber();
});

document.addEventListener("keydown", event => {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "."
    ) {
        addNumber(event.key);
    }

    if (["+", "-", "*", "/", "%"].includes(event.key)) {
        chooseOperation(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }
});