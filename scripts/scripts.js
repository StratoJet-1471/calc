"use strict";

var currentNumber = 0;
var currentOperation = null;
var shouldResetScreenValue = false;

const screen = document.getElementById('main-calc-screen');


function addSymbol(symbol) {
    if (symbol === '.') {
        if (shouldResetScreenValue) shouldResetScreenValue = false;
        if (!screen.value.includes(symbol)) screen.value += symbol;
    }
    else {
        if (shouldResetScreenValue) {
            screen.value = "0";
            shouldResetScreenValue = false;
        }

        if (screen.value == "0") screen.value = symbol;
        else screen.value += symbol;
    }
    screen.value = screen.value;

}

function cut() {
    if (shouldResetScreenValue) shouldResetScreenValue = false;

    let numberAtScreen = Number(screen.value);

    let offsetDueToSign = (numberAtScreen >= 0) ? 1 : 2;
    if (screen.value.length > offsetDueToSign) {
        if (screen.value.at(-2) != ".") screen.value = screen.value.slice(0, -1);

        else screen.value = screen.value.slice(0, -2);
    }
    else screen.value = "0";

    screen.value = screen.value;
}

function invertSign() {
    if (shouldResetScreenValue) shouldResetScreenValue = false;

    let numberAtScreen = Number(screen.value);
    if (numberAtScreen > 0) screen.value = "-" + screen.value;
    else if (numberAtScreen < 0) screen.value = screen.value.slice(1);
    screen.value = screen.value;
}

function setCurrentOperation(operationID) {
    if ("+-*/".includes(operationID)) {
        if (!shouldResetScreenValue) performCurrentOperation();
        currentNumber = Number(screen.value);
        currentOperation = operationID;
        shouldResetScreenValue = true;
        indicateOperation(operationID);
    }
}

function performCurrentOperation() {
    if ("+-*/".includes(currentOperation)) {
        if (currentOperation == "+") currentNumber += Number(screen.value);
        else if (currentOperation == "-") currentNumber -= Number(screen.value);
        else if (currentOperation == "*") currentNumber *= Number(screen.value);
        else if (currentOperation == "/") {
            if (screen.value != 0) currentNumber /= Number(screen.value);
            else currentNumber = 0;
        }

        screen.value = currentNumber;
        currentOperation = null;
        shouldResetScreenValue = true;
        indicateOperation(null);
    }
}

function indicateOperation(operation) {
    if (operation == "+" || operation == "-" || operation == "*" || operation == "/")
        document.getElementById('operation-indicator').innerText = operation;
    else document.getElementById('operation-indicator').innerText = "";
}

function reset() {
    currentNumber = 0;
    screen.value = "0";
    shouldResetScreenValue = false;
    document.getElementById('main-calc-screen').value = screen.value;
    indicateOperation(null);
}
