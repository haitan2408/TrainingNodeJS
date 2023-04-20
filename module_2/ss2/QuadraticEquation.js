class QuadraticEquation {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getA() {
        return this.a;
    }

    getB() {
        return this.b;
    }

    getC() {
        return this.c;
    }

    getDiscriminant() {
        return b * b - 4 * a * c;
    }

    getRoot1() {
        return (-b + Math.pow(this.getDiscriminant(), 0.5)) / (2 * this.a);
    }

    getRoot2() {
        return (-b - Math.pow(this.getDiscriminant(), 0.5)) / (2 * this.a);
    }
}

let a = prompt("Nhập a: ") * 1;
let b = prompt("Nhập b: ") * 1;
let c = prompt("Nhập c: ") * 1;

let quadraticEquation = new QuadraticEquation(a, b, c);
let delta = quadraticEquation.getDiscriminant();
if (delta < 0) {
    alert("The equation has no roots");
} else if (delta == 0) {
    alert(quadraticEquation.getRoot1());
} else {
    alert("Root 1: " + quadraticEquation.getRoot1());
    alert("Root 2: " + quadraticEquation.getRoot2());
}
