const http = require("http");
const url = require('url');
const fs = require("fs");
const qs = require("qs");
const path = require("path");
const connection = require("./connection_db");
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function (req, res) {
    var parseUrl = url.parse(req.url, true);
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '').split("/")[0];
    var method = req.method.toLowerCase();
    if (method == 'get' || method == 'post') {
        var chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        chosenHandler(req, res);
    }
})
server.listen(3000, function () {
});

let handlers = {};
handlers.notFound = function (req, res) {
    fs.readFile(path.join(__dirname, "view/not_found.html"), 'utf-8', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

handlers.list = function (req, res) {
    const sqlSelect = "select * from products";
    connection.query(sqlSelect, (err, result, fields) => {
        if (err) {
            throw err;
        }
        const products = result;
        fs.readFile(path.join(__dirname, "view/list.html"), "utf-8", function (err, data) {
            let temp = "";
            products.forEach(function (element) {
                temp += `<tr>
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.price}</td>
      <td>
        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#cart${element.id}">Add cart</button>
      </td>
       <div class="modal fade" id="cart${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Do you want add to cart the product named ${element.name}?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="location.href = '/addCart/${element.id}'">Add</button>
            </div>
        </div>
      </div>
    </tr>`
            });
            data = data.replace("{listProduct}", temp)
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        })
    });

};

handlers.addCart = function (req, res) {
    let index = -1;
    const id = req.url.split("/")[2];
}


var router = {
    '': handlers.list,
    'addCart': handlers.addCart
};
