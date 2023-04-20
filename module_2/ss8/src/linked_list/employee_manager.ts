import {LinkedList} from "./linked_list";
import {Employee} from "./employee";

class EmployeeManager {
    private static employees = new LinkedList<Employee>();

    static addEmployee(employee: Employee) {
        this.employees.insertLastNode(employee);
    }

    static showList() {
        let el;
        for (let i = 0; i < this.employees.getSize(); i++) {
            el = this.employees.get(i);
            if (el) {
                console.log(el.data.toString())
            }
        }
    }

    static totalMoney() {
        let total = 0;
        let el;
        for (let i = 0; i < this.employees.getSize(); i++) {
            el = this.employees.get(i);
            if (el) {
                total += el.data.getMoney();
            }
        }
        console.log("Tổng lương: " + total)
    }

    static findMaxMoney() {
        let el = this.employees.get(0);
        if (el != null) {
            let maxMoney = el.data.getMoney();
            let indexMax = 0;
            for (let i = 1; i < this.employees.getSize(); i++) {
                el = this.employees.get(i);
                if (el != null && el.data.getMoney() > maxMoney) {
                    maxMoney = el.data.getMoney();
                    indexMax = i;
                }
            }
            console.log(this.employees.get(indexMax)?.data.toString())
        }

    }
}

EmployeeManager.addEmployee(new Employee("1", 100));
EmployeeManager.addEmployee(new Employee("2", 200));
EmployeeManager.addEmployee(new Employee("3", 50));
EmployeeManager.addEmployee(new Employee("4", 250));
EmployeeManager.showList();
EmployeeManager.totalMoney();
EmployeeManager.findMaxMoney();
