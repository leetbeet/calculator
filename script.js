function add(a, b) {
    return Number((a + b).toFixed(3)).toString();
}

function subtract(a, b) {
    return Number((a - b).toFixed(3)).toString();
}

function multiply(a, b) {
    return Number((a * b).toFixed(3)).toString();
}

function divide(a, b) {
    return Number((a / b).toFixed(3)).toString();
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
            if (b === 0) return "ERROR";
            return divide(a, b);
    }
}

const display = document.querySelector("#display");

let num1 = "";
let num2 = "";
let operator = "";
let deleteNext = false;
let dpFirst = false;
let dpSecond = false;
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "×", "÷"];

function writeToDisplay(item, equal=false) {
    if (display.textContent === "ERROR") return;

    if (deleteNext) {
        if (nums.includes(item) || item === ".") {
            num1 = item;
            display.textContent = item;
            deleteNext = false;
            return;
        } 
        deleteNext = false;
    }
    
    if (display.textContent.trim() === "" && (nums.includes(item) || item === "+" || item === "-" || item === ".")) {
        num1 += item;
        display.textContent += item;
        if (item === ".") dpFirst = true;
    } else if (num1 !== "" && operator === "") {
        if (operators.includes(item)) {
            operator = item;
            display.textContent += item;
        } else if (nums.includes(item)) {
            num1 += item;
            display.textContent += item;
        } else if (item === "." && !dpFirst) {
            num1 += item;
            display.textContent += item;
            dpFirst = true;
        }
    } else {
        if (nums.includes(item)) {
            num2 += item;
            display.textContent += item;
        } else if ((operators.includes(item) && num2 !== "") || equal) {
            num1 = (operate(operator, Number(num1), Number(num2)));
            num2 = "";
            if (Number.isInteger(Number(num1))) dpFirst = false;
            dpSecond = false;
            operator = item;
            display.textContent = num1 + operator;
            if (equal) deleteNext = true;
        } else if (item === "." && !dpSecond) {
            num2 += item;
            display.textContent += item;
            dpSecond = true;
        }
    }
}

function del() {
    if (display.textContent === "ERROR" || deleteNext) return;
    display.textContent = display.textContent.slice(0, -1);
    if (num2 !== "") {
        if (num2.at(-1) === ".") dpSecond = false;
        num2 = num2.slice(0, -1);
    } else if (operator !== "") {
        operator = "";
    } else {
        if (num1.at(-1) === ".") dpFirst = false;
        num1 = num1.slice(0, -1);
    }
}

function evaluate() {
    if (num1 !== "" && num2 !== "" && operator !== "") {
        writeToDisplay("", true);
    }
}

document.querySelectorAll(".num, .operator, #decimal").forEach(function(button) {
    button.addEventListener("click", function() {
        writeToDisplay(button.textContent);
    });
});

document.querySelector("#equal").addEventListener("click", evaluate);

document.querySelector("#clear").addEventListener("click", function() {
    display.textContent = "";
    num1 = "";
    num2 = "";
    dpFirst = false;
    dpSecond = false;
    deleteNext = false;
    operator = "";
});

document.querySelector("#del").addEventListener("click", del);

document.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        del();
    } else if (event.key === "=" || event.key === "Enter") {
        event.preventDefault();
        evaluate();
    } else {
        if (event.key === "*") {
            writeToDisplay("×");
        } else if (event.key === "/") {
            writeToDisplay("÷");
        } else {
            writeToDisplay(event.key);
        }
    }
});

