const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function inputDigit(digit) {
    if(calculator.displayNumber === '0' || calculator.waitingForSecondNumber) {
        calculator.displayNumber = digit;
        calculator.waitingForSecondNumber = false;
    } else {
        calculator.displayNumber += digit;
    }
}

function clearCalculator() {
    calculator.displayNumber = '0',
    calculator.operator = null,
    calculator.firstNumber = null,
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    calculator.displayNumber += digit;
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        // mendapatkan objek elemen yang diklik
        const target = event.target;


        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inversNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}

function inputDigit(digit) {
    if(calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}


function inversNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}

function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    const first = parseFloat(calculator.firstNumber);
    const second = parseFloat(calculator.displayNumber);


    if (calculator.operator === "+") {
        result = first + second;
    } else if (calculator.operator === "-") {
        result = first - second;
    } else if (calculator.operator === "*") {
        result = first * second;
    } else if (calculator.operator === "/") {
        if (second === 0) {
            alert("Angka 0 tidak diperbolehkan");
            clearCalculator();
            updateDisplay();
            return;
        }
        result = first / second;
    }

    calculator.displayNumber = result.toString();
}