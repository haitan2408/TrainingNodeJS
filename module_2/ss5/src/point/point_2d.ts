class Point2D {
    private x: number;
    private y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    setX(x: number) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    setY(y: number) {
        this.y = y;
    }

    getXY() {
        return {x: this.x, y: this.y}
    }

    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
