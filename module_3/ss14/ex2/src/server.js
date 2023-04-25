const http = require("http");
const url = require('url');
const fs = require("fs");
const qs = require("qs");
const path = require("path");
const connection = require("./connection_db");
const StringDecoder = require('string_decoder').StringDecoder;
const localStorage = require('local-storage');

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
    const sqlSelect = `select * from products where id = ${id}`;

    connection.query(sqlSelect, (err, result, fields) => {
        if (err) {
            throw err;
        }
        if (!result || result.length == 0) {
            return res.status(400).send();
        }
        const product = result[0];
        let products = [];
        var tokenID = localStorage.get("token");
        if (!tokenID) {
            tokenID = createRandomString(20);
            localStorage.set('token', tokenID);
        } else {
            let expires = JSON.parse(fs.readFileSync(`src/token/${tokenID}`)).expires;
            let now = Date.now();
            if (expires < now) {
                fs.unlinkSync(`src/token/${tokenID}`);
                tokenID = createRandomString(20);
                localStorage.set('token', tokenID);
            } else {
                products = JSON.parse(fs.readFileSync(`src/token/${tokenID}`)).data;
            }
        }

        products = findProduct(products, product);
        createTokenSession(tokenID, products);
        res.writeHead(302, {
            Location: "/",
        });
        return res.end();
    })
}

var findProduct = function (products, product) {
    let isFind = false;
    let productJson = {id: product.id, amount: 1}
    for (let temp of products) {
        if (product.id === temp.id) {
            temp.amount = parseInt(temp.amount) + 1;
            isFind = true;
            break;
        }
    }
    if (!isFind) {
        products.push(productJson);
    }
    return products;
}

var createTokenSession = function (tokenId, data) {
    let fileName = path.join(__dirname, 'token/' + tokenId);
    let expires = Date.now() + 1000 * 10;
    let json = {data: data, expires: expires}
    fs.writeFileSync(fileName, JSON.stringify(json));
}

var createRandomString = function (strLength) {
    strLength = typeof (strLength) == 'number' & strLength > 0 ? strLength : false;
    if (strLength) {
        var possibleCharacter = 'abcdefghiklmnopqwerszx1234567890';
        var str = '';
        for (let i = 0; i < strLength; i++) {
            let ramdomCharater = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));
            str += ramdomCharater;
        }
        return str;
    }
}

handlers.cartList = function (req, res) {
    var tokenID = localStorage.get("token");
    let resultCall = callSQL(tokenID).then(temp => {
        fs.readFile(path.join(__dirname, "view/list_cart.html"), "utf-8", function (err, data) {
            data = data.replace("{listProductCart}", temp);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        });
    })
};

function callSQL(tokenID) {
    return new Promise((resolve, reject) => {
        let temp = "";
        if (!tokenID) {
            temp = "<tr>" +
                "<td colspan='4'>Không có sản phẩm trong giỏ hàng</td>" +
                "</tr>"
            resolve(temp);
        } else {
            let expires = JSON.parse(fs.readFileSync(`src/token/${tokenID}`)).expires;
            let now = Date.now();
            if (expires < now) {
                temp = "<tr>" +
                    "<td colspan='4'>Không có sản phẩm trong giỏ hàng</td>" +
                    "</tr>"
                resolve(temp);
            } else {
                let productsFile = JSON.parse(fs.readFileSync(`src/token/${tokenID}`)).data;
                let map = new Map();
                for (let tempProduct of productsFile) {
                    map.set(tempProduct.id, tempProduct);
                }
                const sqlSelect = `select * from products where id in (${Array.from(map.keys())})`;
                connection.query(sqlSelect, (err, result, fields) => {
                    if (err) {
                        throw err;
                    }
                    if (!result || result.length == 0) {
                        return res.status(400).send();
                    }

                    for (let r of result) {
                        temp += `<tr>
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.price}</td>
     <td>${map.get(r.id).amount}</td>
    </tr>`;
                    }
                    resolve(temp);
                });
            }
        }
    })
}

var router = {
    '': handlers.list,
    'addCart': handlers.addCart,
    'cart': handlers.cartList
};
