const displayLimit = 20;
const scientificNotationThreshhold = 12;
let lastAnswer = null;
let operand1 = null;
let operand2 = null;
let operator = null;
const buttonsContainer = document.querySelector("#buttons");
buttonsContainer.addEventListener("click", (e) => {
    if (e.target !== buttonsContainer) {
        operate(e.target.id);
    }
});
;

function operate(id) {
    const outputArea = document.querySelector("#output");

    if (id === "ac") {
        updateDisplay('', false, true);
        lastAnswer = null;
        operand1 = null;
        operand2 = null;
        operator = null;
    }
    else if (id === "del")
        updateDisplay('', true);
    else if ((id >= '0' && id <= '9') || id === '.') {
        if (isOperator(outputArea.textContent)) { //if there is an operator 
            updateDisplay(id, false, true);
        }
        else
            updateDisplay(id);
    }
    else if (isOperator(id)) {
        if (outputArea.textContent.length > 0 && !isOperator(outputArea.textContent)) {//output area not empty and does not have an operator already  
            operand1 = outputArea.textContent;
            operator = id;
            updateDisplay(id, false, true);
        }
        else if (isOperator(outputArea.textContent)) {
            operator = id;
            updateDisplay(id, false, true);
        }
    }
    else if (id === "=") {
        if (operand1 === null || isOperator(outputArea.textContent))
            return;
        operand2 = outputArea.textContent
        let result = calculate();
        updateDisplay(result, false, true);
        lastAnswer = result;
        operand1=null;
        operand2=null;
    }
}


function calculate() {
    operand2 = operand2 || lastAnswer;
    let n1 = Number(operand1);
    let n2 = Number(operand2);
    let value = 0;
    switch (operator) {
        case "+":
            value = n1 + n2;
            break;
        case "-":
            value = n1 - n2;
            break;

        case "*":
            value = n1 * n2;
            break;

        case "/":
            value = n1 / n2;
            break;
    }
    if (value.toString().length > scientificNotationThreshhold) {
        const scientificNotation = parseFloat(value).toExponential(2);
        return scientificNotation;
    }
    return value;


}


function updateDisplay(string = '', del = false, reset = false) {
    const outputArea = document.querySelector("#output");
    if (del) {
        if (outputArea.textContent.length > 0)
            outputArea.textContent = outputArea.textContent.substring(0, outputArea.textContent.length - 1);
    }

    if (reset) {
        outputArea.textContent = "";
    }
    if (outputArea.textContent.length < displayLimit) {
        switch (string) {
            case '':
                return;

            case ".":
                if (!outputArea.textContent.includes(".")) {
                    outputArea.textContent += '.';
                }
                return;

            default:
                outputArea.textContent += string;
                return;
        }
    }
}

function isOperator(string) {
    return string === "+" || string === "-" || string === "*" || string === "/";
}
