"use strict";

var screenValue = "0";
var currentNumber = 0;
var currentOperation = null;
var shouldResetScreenValue = false;

function addSymbol(symbol) {
    if(symbol==='.') {
        if(shouldResetScreenValue) shouldResetScreenValue = false;
        if(screenValue.indexOf(symbol)===-1) screenValue+=symbol; 
    }
    else {
        if(shouldResetScreenValue) {
            screenValue = "0";
            shouldResetScreenValue = false;
        }

        if(screenValue=="0") screenValue=symbol;
        else screenValue+=symbol;
    }
    document.getElementById('main-calc-screen').value = screenValue;

}

function cut() {
    if(shouldResetScreenValue) shouldResetScreenValue = false;

    let numberAtScreen = Number(screenValue);

    let offsetDueToSign = (numberAtScreen >= 0) ? 1 : 2;
    if(screenValue.length > offsetDueToSign) {
        if(screenValue[screenValue.length-2]!=".") screenValue = screenValue.substring(0, screenValue.length-1);
        else screenValue = screenValue.substring(0, screenValue.length-2);
    }
    else screenValue = "0";  

    document.getElementById('main-calc-screen').value = screenValue;
}

function invertSign() {
    if(shouldResetScreenValue) shouldResetScreenValue = false;

    let numberAtScreen = Number(screenValue);    
    if(numberAtScreen > 0) screenValue = "-" + screenValue;
    else if(numberAtScreen < 0) screenValue = screenValue.substring(1, screenValue.length);
    document.getElementById('main-calc-screen').value = screenValue;
}

function setCurrentOperation(operationID) {
    if(operationID=="+" || operationID=="-" || operationID=="*" || operationID=="/") {
        if(!shouldResetScreenValue) performCurrentOperation();
        currentNumber = Number(screenValue);
        currentOperation = operationID;
        shouldResetScreenValue = true;
        indicateOperation(operationID);
    }
}

function performCurrentOperation() {
    if(currentOperation=="+" || currentOperation=="-" || currentOperation=="*" || currentOperation=="/") {
        if(currentOperation=="+") currentNumber += Number(screenValue);
        else if(currentOperation=="-") currentNumber -= Number(screenValue);
        else if(currentOperation=="*") currentNumber *= Number(screenValue);
        else if(currentOperation=="/") { 
            if(screenValue!=0) currentNumber /= Number(screenValue);
            else currentNumber = 0;
        }

        screenValue = String(currentNumber);
        document.getElementById('main-calc-screen').value = screenValue;
        currentOperation = null;
        shouldResetScreenValue = true;
        indicateOperation(null);
    }
}

function indicateOperation(operation) {
    if(operation=="+" || operation=="-" || operation=="*" || operation=="/")
        document.getElementById('operation-indicator').innerText = operation;
    else document.getElementById('operation-indicator').innerText = "";
}

function reset() {
    currentNumber = 0;
    screenValue = "0";
    shouldResetScreenValue = false;
    document.getElementById('main-calc-screen').value = screenValue;
    indicateOperation(null);
}