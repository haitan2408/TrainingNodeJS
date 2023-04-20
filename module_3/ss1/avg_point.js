let students = [
    {
        name: "Ha",
        gender: 'female',
        point: 8
    },
    {
        name: "Huy",
        gender: 'male',
        point: 9
    },
    {
        name: "Hung",
        gender: 'male',
        point: 7
    },
    {
        name: "Phuong",
        gender: 'female',
        point: 6
    },
    {
        name: "Huyen",
        gender: 'female',
        point: 10
    },
    {
        name: "Long",
        gender: 'male',
        point: 5
    },
    {
        name: "Luan",
        gender: 'male',
        point: 10
    },
    {
        name: "Linh",
        gender: 'female',
        point: 8
    }
];

function avgOfStudentGender(gender, students) {
    let count = 0;
    let totalPoint = students.reduce((total, currentElement) => {
        if (currentElement.gender == gender) {
            count++;
            return total+ currentElement.point;
        }
        return total;
    }, 0)
    return totalPoint/count;
}

console.log(avgOfStudentGender("male", students))
console.log(avgOfStudentGender("female", students))

