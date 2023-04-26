let employeeService = {};

let arr = [
    {
        id: 1,
        name: "HaiTT",
        department: "CodeGym"
    },
    {
        id: 2,
        name: "TrungDP",
        department: "CodeGym"
    },
    {
        id: 3,
        name: "TrungDC",
        department: "CodeGym"
    }
];

employeeService.getAll = function () {
    return arr;
};

employeeService.addEmployee = function(employee) {
    arr.push(employee);
};

employeeService.removeEmployee = function(id) {
    for(let index in arr) {
        if(arr[index].id == id) {
            arr.splice(index, 1);
            return;
        }
    }
}

module.exports = employeeService;
