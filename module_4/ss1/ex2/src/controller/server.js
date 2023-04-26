const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const multer = require('multer');
const upload = multer();
const employeeService = require('../service/employee_service');
const session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: {maxAge: 60000}
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    let success = "";
    if (req.session) {
        success = req.session.success;
        req.session.success = null;
    }
    res.render("list", {data: employeeService.getAll(), success: success});
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", upload.none(), (req, res) => {
    if (req.body.id && req.body.name && req.body.department) {
        const employee = {
            id: req.body.id,
            name: req.body.name,
            department: req.body.department
        }

        employeeService.addEmployee(employee);
        req.session.success = "true";
        res.redirect("/");
    } else {
        res.render("error");
    }
});

app.post("/delete", upload.none(), (req, res) => {
    if (req.body.idEmployee) {
        let id = req.body.idEmployee;
        employeeService.removeEmployee(id);
        req.session.success = "delete";
        res.redirect("/");
    } else {
        res.render("error");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
