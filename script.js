// "Newton School MINI Project"
/*
    Author: Aniket Waliyan
    Batch: Chrome
    Date: 31/07/2021
    Mentor: Rajat Gupta
*/

const calculator = {
	displayValue: '0',
	firstOperand: null,
	awaitSecondOperand: false,
	operator: null
};

function inputDigit(digit) {
    let displayValue  = calculator.displayValue;
    let awaitSecondOperand = calculator.awaitSecondOperand;

	if (awaitSecondOperand === true) {
		calculator.displayValue = digit
		calculator.awaitSecondOperand = false;
	} else {
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
}

function deleteKey() {
    let displayValue  = calculator.displayValue;
	let buffer = displayValue;

	if (buffer.length === 1) {
		buffer = '0';
	} else {
		buffer = displayValue.substring(0, displayValue.length - 1);
	}
	calculator.displayValue = buffer;
	updateDisplay();
	console.log(calculator);
	console.log(displayValue);
}

function handleOperator(nextOperator) {
    let firstOperand = calculator.firstOperand;
    let displayValue = calculator.displayValue;
    let operator = calculator.operator;
	const inputValue = parseInt(displayValue);

	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		return;
	}

	if (firstOperand === null) {
		calculator.firstOperand = inputValue;
	} else if (operator) {
		const currentValue = firstOperand || 0;
		const result = getCalculation[operator](currentValue, inputValue);

		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.awaitSecondOperand = true;
	calculator.operator = nextOperator;
}

const getCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,

	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,

	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,

	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,

	'=': (firstOperand, secondOperand) => secondOperand
};

function clearState() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.awaitSecondOperand = false;
	calculator.operator = null;
	console.log(calculator);
}

function updateDisplay() {
	const display = document.querySelector('.screen');
	display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', event => {
    const target = event.target;
	if (!target.matches('button')) {
		return;
	}
	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	}
	if (target.classList.contains('all-clear')) {
		clearState();
		updateDisplay();
		return;
	}
	if (target.classList.contains('backspace')) {
		deleteKey();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});