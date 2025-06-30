function add(a, b) {
    return parseFloat((a + b).toFixed(3)).toString();
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(3)).toString();
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(3)).toString();
}

function divide(a, b) {
    return parseFloat((a / b).toFixed(3)).toString();
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

let num1 = "";
let num2 = "";
let operator = "";
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "×", "÷"];

function writeToDisplay(item, equal=false) {
    const display = document.querySelector("#display");
    if (display.textContent.trim() === "" && (nums.includes(item) || item === "+" || item === "-")) {
        num1 += item;
        display.textContent += item;
    } else if (num1 !== "" && operator === "") {
        if (operators.includes(item)) {
            operator = item;
            display.textContent += item;
        } else if (nums.includes(item)) {
            num1 += item;
            display.textContent += item;
        }
    } else {
        if (nums.includes(item)) {
            num2 += item;
            display.textContent += item
        } else if ((operators.includes(item) && num2 !== "") || equal) {
            num1 = (operate(operator, Number(num1), Number(num2)));
            num2 = "";
            operator = item;
            display.textContent = num1 + operator;
        }
    }
}



document.querySelectorAll(".num, .operator, #decimal").forEach(function(button) {
    button.addEventListener("click", function() {
        writeToDisplay(button.textContent);
    });
});

document.querySelector("#equal").addEventListener("click", function() {
    if (num1 !== "" && num2 !== "" && operator !== "") {
        writeToDisplay("", true);
    }
});