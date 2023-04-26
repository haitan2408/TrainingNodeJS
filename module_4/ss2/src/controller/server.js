const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const path = require("path")
const employeeService = require("../service/employee_service");
const session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: {maxAge: 60000}
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.get('/', (req, res) => {
    let success = "";
    if (req.session) {
        success = req.session.success;
        req.session.success = null;
    }
    let page = 0;
    if (req.query.page) {
        page = req.query.page;
    }
    employeeService.getAll(page).then(data => {
        res.render("list", {data: data, success: success, page: page});
    });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", (req, res) => {
    const {name, department} = req.body;
    if (name && department) {
        const employee = {
            name: name,
            department: department
        }
        employeeService.addEmployee(employee).then(result => {
            req.session.success = "true";
            res.redirect("/");
        })
    } else {
        res.render("error");
    }
});

app.post("/delete", (req, res) => {
    if (req.body.idEmployee) {
        let id = req.body.idEmployee;
        employeeService.removeEmployee(id).then(result => {
            req.session.success = "delete";
            res.redirect("/");
        })
    } else {
        res.render("error");
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
