const displayLimit = 22;
const scientificNotationThreshhold = 12;
let lastAnswer = 0;

function calculate(operand1, operand2, operator) {
    let value = 0n;
    switch (operator) {
        case "+":
            value = operand1 + operand2;
            break;
        case "-":
            value = operand1 - operand2;
            break;

        case "*":
            value = operand1 * operand2;
            break;

        case "/":
            value = operand1 / operand2;
            break;
    }
    if (value.toString().length > scientificNotationThreshhold) {
        const scientificNotation = parseFloat(value).toExponential(2);
        return scientificNotation;
    }

}


const outputArea = document.querySelector("#output");
function updateDisplay(string = '', del = false, reset = false) {
    if (del) {
        if (outputArea.textContent.length > 0)
            outputArea.textContent = outputArea.textContent.substring(0, outputArea.textContent.length - 1);
    }

    if (reset) {
        outputArea.textContent = "";
    }

    switch (string) {
        case '':
            return;

        case ".":
            if (!outputArea.textContent.contains(".")) {
                outputArea.textContent += '.';
            }
            return;

        default:
            outputArea.textContent += string;
            return;
    }
}

