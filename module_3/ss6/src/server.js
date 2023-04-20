const http = require("http");
const url = require('url');
const fs = require("fs");
const qs = require("qs");
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function (req, res) {
    var parseUrl = url.parse(req.url, true);
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '');
    var method = req.method.toLowerCase();
    if (method == 'get') {
        var chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        chosenHandler(req, res);
    } else {
        var chosenHandler = router.profile;
        chosenHandler(req, res);
    }
})
server.listen(3000, function () {
});

var handlers = {};

handlers.login = function (rep, res) {
    fs.readFile('src/view/login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
// home page
handlers.home = function (rep, res) {
    fs.readFile('src/view/home.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// not found
handlers.notFound = function (rep, res) {
    fs.readFile('src/view/not_found.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
// profile
handlers.profile = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data = qs.parse(data);
        fs.readFile('src/view/profile.html', 'utf8', function (err, dataHtml) {
            dataHtml = dataHtml.replace("{name}", data.name);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(dataHtml);
            return res.end();
        });
    });
}
var router = {
    '': handlers.home,
    'login': handlers.login,
    'profile': handlers.profile
}
