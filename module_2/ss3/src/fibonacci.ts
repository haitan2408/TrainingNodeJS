function displayFibonacci(m: number): void {
    let sum = 0;
    for (let i = 0; i < m; i++) {
        let num1 = 0;
        let num2 = 1;
        if (checkFibonacci(i, num1, num2)) {
            console.log(i)
            sum += i;
        }
    }
    console.log(sum);
}

function checkFibonacci(n: number, num1: number, num2: number): boolean {
    let num3 = num1 + num2;
    if (num3 == n) {
        return true;
    } else if (num3 > n) {
        return false;
    } else {
        return checkFibonacci(n, num2, num3);
    }
}

displayFibonacci(10);
