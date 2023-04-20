const http = require("http");
const url = require('url');
const fs = require("fs");
const qs = require("qs");
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
    fs.readFile('src/view/not_found.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

handlers.list = function (req, res) {
    const products = JSON.parse(fs.readFileSync("src/data/db.json"));
    fs.readFile("src/view/list.html", 'utf-8', function (err, data) {
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
        const products = JSON.parse(fs.readFileSync("src/data/db.json"));
        data.id = +data.id;
        data.price = +data.price;
        products.push(data);
        fs.writeFileSync("src/data/db.json", JSON.stringify([...products]));
        res.writeHead(302, {
            Location: "/",
        });
        return res.end();
    });

};

handlers.showFormUpdate = function (req, res) {
    const id = req.url.split("/")[2];
    const products = JSON.parse(fs.readFileSync("src/data/db.json"));
    const product = products.filter(element => element.id == +id)[0];
    if (!products) {
        return res.status(400).send();
    }
    fs.readFile("src/view/update.html", 'utf-8', function (err, data) {
        data = data.replace("{name}", product.name);
        data = data.replace("{id}", product.id);
        data = data.replace("{price}", product.price);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.update = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        data = qs.parse(data);
        const products = JSON.parse(fs.readFileSync("src/data/db.json"));
        let flag = false;
        for (let product of products) {
            if (product.id == +data.id) {
                flag = true;
                product.name = data.name;
                product.price = +data.price;
                break;
            }
        }
        if (!flag) {
            return res.status(400).send();
        }
        fs.writeFileSync("src/data/db.json", JSON.stringify([...products]));
        res.writeHead(302, {
            Location: "/",
        });
        return res.end();
    });
};

handlers.delete = function (req, res) {
    let index = -1;
    const id = req.url.split("/")[2];
    const products = JSON.parse(fs.readFileSync("src/data/db.json"));
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +id) {
            index = i;
        }
    }
    if (index == -1) {
        return res.end();
    }
    products.splice(index, 1);
    fs.writeFileSync("src/data/db.json", JSON.stringify([...products]));
    res.writeHead(302, {
        Location: "/",
    });
    return res.end();
}

var router = {
    '': handlers.list,
    'createForm': handlers.showFormCreate,
    'create': handlers.createProduct,
    'updateForm': handlers.showFormUpdate,
    'update': handlers.update,
    'delete': handlers.delete
}
