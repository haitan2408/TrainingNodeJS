const connection = require("../repository/connection")
let employeeService = {};


employeeService.getAll = function (page) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM staffs limit 2 offset "+ (page*2);
        connection.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    })

};

employeeService.addEmployee = function(employee) {
    return new Promise((resolve, reject) => {
        const sqlInsert = "INSERT INTO staffs (name, department) VALUES ?";
        const value = [
            [employee.name, employee.department]
        ];
        connection.query(sqlInsert, [value], function (err, result) {
            if (err) throw err;
            resolve("success")
        });
    })
};

employeeService.removeEmployee = function(id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM staffs WHERE id = " + id;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            resolve("success");
        });
    })
}

module.exports = employeeService;
