class Triangle extends Shape {
    private side1: number;
    private side2: number;
    private side3: number;


    constructor(name: string, color: string, side1: number, side2: number, side3: number) {
        super(name, color);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    getSide1() {
        return this.side1;
    }

    setSide1(side1: number) {
        this.side1 = side1;
    }

    getSide2() {
        return this.side2;
    }

    setSide2(side2: number) {
        this.side2 = side2;
    }

    getSide3() {
        return this.side3;
    }

    setSide3(side3: number) {
        this.side3 = side3;
    }

    getPerimeter() {
        return this.side1 + this.side2 + this.side3;
    }

    getArea() {
        const p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3));
    }
}
