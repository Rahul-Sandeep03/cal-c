document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let shouldResetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('number')) {
                if (shouldResetScreen) resetScreen();
                currentInput += value;
                updateDisplay();
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('function')) {
                handleFunction(value);
            }
        });
    });

    function updateDisplay() {
        display.value = currentInput;
    }

    function resetScreen() {
        currentInput = '';
        shouldResetScreen = false;
    }

    function handleOperator(op) {
        if (currentInput === '' && op !== '=') return;

        if (previousInput !== '' && currentInput !== '') {
            calculate();
        } else {
            previousInput = currentInput;
        }

        operator = op;
        shouldResetScreen = true;

        if (op === '=') {
            calculate();
            operator = '';
        }
    }

    function handleFunction(func) {
        switch (func) {
            case 'AC':
                currentInput = '';
                previousInput = '';
                operator = '';
                updateDisplay();
                break;
            case '+/-':
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
                break;
            case '%':
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
                break;
        }
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        previousInput = '';
        updateDisplay();
    }
});
