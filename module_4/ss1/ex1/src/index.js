const express = require('express');
const app = express();
const port = 3000;
const path = require("path")
const array = require('./service/blog_service')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("list", {data: array});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
