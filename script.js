function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
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

function writeToDisplay(item) {
    const display = document.querySelector("#display");
    display.textContent += item;
}

document.querySelectorAll(".num, .operator, #decimal").forEach(function(button) {
    button.addEventListener("click", function() {
        writeToDisplay(button.textContent);
    });
});