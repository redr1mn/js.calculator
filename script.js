const display = document.querySelector('.calc-output');
const buttonContainer = document.querySelector('.calc-buttons');

let currentInput = '0';
let previousInput = '';
let operator = null;
let resetDisplay = false;

buttonContainer.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;
    const buttonText = event.target.textContent;
    if (buttonText === '%') {
        handlePercent();
    } else if (event.target.classList.contains('number-btn')) {
        handleNumber(buttonText);
    } else if (event.target.classList.contains('operator-btn')) {
        handleOperator(buttonText);
    } else if (event.target.classList.contains('decimal-btn')) {
        handleDecimal();
    } else if (event.target.classList.contains('clear-btn')) {
        clearCalculator();
    } else if (event.target.classList.contains('equals-btn')) {
        calculate();
    }
    updateDisplay();
});

function handleNumber(num) {
    if (currentInput === '0' || resetDisplay) {
        currentInput = num;
        resetDisplay = false;
    } else {
        currentInput += num;
    }
}

function handleDecimal() {
    if (resetDisplay) {
        currentInput = '0.';
        resetDisplay = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handlePercent() {
    const value = parseFloat(currentInput);
    if (isNaN(value)) return;

    if (operator === '+' || operator === '-') {
        const first = parseFloat(previousInput);
        if (!isNaN(first)) {
            currentInput = String((first * value) / 100);
        } else {
            currentInput = String(value / 100);
        }
    } else {
        currentInput = String(value / 100);
    }
    resetDisplay = true;
}

function handleOperator(nextOperator) {
    if (operator && !resetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    resetDisplay = true;
}

function updateDisplay() {
    display.value = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    resetDisplay = false;
}

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

function calculate() {
    if (operator === null) return;
    const first = parseFloat(previousInput);
    const second = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = formatNumber(add(first, second));
            break;
        case '-':
            result = formatNumber(subtract(first, second));
            break;
        case '×':
            result = formatNumber(multiply(first, second));
            break;
        case '÷':
            if (second === 0) result = 'Error';
            else result = formatNumber(divide(first, second));
            break;
    }
    currentInput = String(result);
    operator = null;
    resetDisplay = true;
}

function formatNumber(num) {
    return parseFloat(num.toFixed(10));
}