class Shape {
    private name: string;
    private color: string;


    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getColor() {
        return this.color;
    }

    setColor(color: string) {
        this.color = color;
    }
}
