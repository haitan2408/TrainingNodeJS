class Employee {
    private code: number;
    private firstName: string;
    private lastName: string;
    private dateOfBirth: string;
    private address: string;
    private position: string;

    toString() {
        return `Tên: ${this.firstName} ${this.lastName}, ngày sinh: ${this.dateOfBirth}, địa chỉ: ${this.address}, vị trí: ${this.position}`;
    }

    constructor(code: number, firstName: string, lastName: string, dateOfBirth: String, address: string, position: string) {
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.position = position;
    }

    getCode() {
        return this.code;
    }

    setCode(code: number) {
        this.code = code;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    setDateOfBirth(dateOfBirth: String) {
        this.dateOfBirth = dateOfBirth;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position: string) {
        this.position = position;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address: string) {
        this.address = address;
    }
}
