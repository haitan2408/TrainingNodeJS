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
        <button class="btn btn-warning" onclick="location.href = '/updateForm/${element.id}'">Update</button>
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${element.id}">Delete</button>
      </td>
      <div class="modal fade" id="deleteModal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Do you want to delete the product named ${element.name}?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="location.href = '/delete/${element.id}'">Delete</button>
            </div>
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

handlers.showFormCreate = function (req, res) {
    fs.readFile("src/view/create.html", function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.createProduct = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        data = qs.parse(data);
        data.price = +data.price;
        const sqlInsert = `INSERT INTO products(name, price) VALUES ('${data.name}', ${data.price})`;
        connection.query(sqlInsert, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        res.writeHead(302, {
            Location: "/",
        });
        return res.end();
    });

};

handlers.showFormUpdate = function (req, res) {
    const id = req.url.split("/")[2];
    const sqlSelect = `select * from products where id = ${id}`;
    connection.query(sqlSelect, (err, result, fields) => {
        if (err) {
            throw err;
        }
        if (!result || result.length == 0) {
            return res.status(400).send();
        }
        const product = result[0];
        fs.readFile("src/view/update.html", 'utf-8', function (err, data) {
            data = data.replace("{name}", product.name);
            data = data.replace("{id}", product.id);
            data = data.replace("{price}", product.price);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    })
};

handlers.update = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        data = qs.parse(data);
        const queryUpdate = `UPDATE products SET name = '${data.name}', price = ${data.price} WHERE id = ${data.id}`;
        connection.query(queryUpdate, (err, result, fields) => {
            if (err) {
                throw err;
            }
            res.writeHead(302, {
                Location: "/",
            });
            return res.end();
        });
    });
};

handlers.delete = function (req, res) {
    let index = -1;
    const id = req.url.split("/")[2];
    const sqlDelete = `delete from products where id = ${id}`;
    connection.query(sqlDelete, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.writeHead(302, {
            Location: "/",
        });
        return res.end();
    });
};

var router = {
    '': handlers.list,
    'createForm': handlers.showFormCreate,
    'create': handlers.createProduct,
    'updateForm': handlers.showFormUpdate,
    'update': handlers.update,
    'delete': handlers.delete
};
