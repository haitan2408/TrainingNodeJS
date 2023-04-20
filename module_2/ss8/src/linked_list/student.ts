export class Student {
    private id: number;
    private name: string;
    private score: number;


    constructor(id: number, name: string, score: number) {
        this.id = id;
        this.name = name;
        this.score = score;
    }


    getId(): number {
        return this.id;
    }

    setId(value: number) {
        this.id = value;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getScore(): number {
        return this.score;
    }

    setScore(value: number) {
        this.score = value;
    }

    toString() {
        return `Tên học sinh: ${this.name}, điểm của học sinh: ${this.score}`;
    }
}
