export class Employee {
   private month: string;
   private money: number;


    constructor(month: string, money: number) {

        this.month = month;
        this.money = money;
    }

    getMonth(): string {
        return this.month;
    }

    setMonth(value: string) {
        this.month = value;
    }

    getMoney(): number {
        return this.money;
    }

    setMoney(value: number) {
        this.money = value;
    }

    toString() {
        return `Lương: ${this.getMoney()}, tháng: ${this.getMonth()}`;
    }
}
