class Employee {
    private name: string;
    private gender: Gender;
    private dateOfBirth: string;
    private email: string;
    private phoneNumber?: string;


    constructor(name: string, gender: Gender, dateOfBirth: string, email: string, phoneNumber: string) {
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getGender() {
        return this.gender;
    }

    setGender(gender: Gender) {
        this.gender = gender;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    setDateOfBirth(dateOfBirth: String) {
        this.dateOfBirth = dateOfBirth;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }


}

enum Gender {
    MALE = "Nam",
    FEMALE = "Nữ",
    OTHER = "Khác",

}

let employees: Employee[] = [];

function displayEmployee(employee: Employee) {
    console.log(`Thông tin nhân viên bao gồm tên: ${employee.getName()}, giới tính: ${employee.getGender()}`)
}

function addEmployee(employee: Employee) {
    employees.push(employee);
}

function removeEmployee(index: number) {
    if (index < employees.length && index >= 0) {
        employees.splice(index, 1);
    }
}

let employee = new Employee("HảiTT", Gender.MALE, "1998-01-01", "hai.truong@codegym.vn", "07912345678");

displayEmployee(employee);
