function calculator(number1: number, number2: number, operator: string) {
    let result;
    if (operator == '+') {
        result = number1 + number2;
    } else if (operator == '-') {
        result = number1 - number2;
    } else if (operator == '*') {
        result = number1 * number2;
    } else if (operator == '/') {
        result = number1 / number2;
    } else {
        throw new RangeError("The Operator must be an +, -, *, /")
    }
    return result;
}

try {
    calculator(1, 3, "y");
} catch (e) {
    if (e instanceof RangeError) {
        console.log(e.message)
    }
}
