class EmployeeManager {
    private static employees: Employee[] = [];

    public static displayAllEmployee(): void {
        for (let employee of this.employees) {
            console.log(employee.toString())
        }
    }

    public static addEmployee(employee: Employee): void {
        this.employees.push(employee);
        console.log("Thêm thành công")
    }

    public static removeEmployee(code: number) {
        for(let index = 0 ; index <this.employees.length; index++) {
            if(this.employees[index].getCode() == code) {
                this.employees.splice(index, 1);
                console.log("Xóa thành công");
                return;
            }
        }
        console.log(`Không có nhân viên với mã code ${code} cần xóa!`)
    }

    public static updateEmployee(employee: Employee) {
        for(let temp of this.employees) {
            if(temp.getCode() == employee.getCode() ) {
                temp.setPosition(employee.getPosition());
                temp.setFirstName(employee.getFirstName());
                temp.setLastName(employee.getLastName());
                temp.setDateOfBirth(employee.getDateOfBirth());
                temp.setAddress(employee.getAddress());
                console.log("Cập nhật thành công")
                return;
            }
        }
        console.log(`Không có nhân viên với mã ${employee.getCode()} cần sửa!`)
    }
}
