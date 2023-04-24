const http = require("http");
const fs = require("fs");
const qs = require("qs");
const path = require("path");
const cookie = require('cookie');
const escapeHtml = require('escape-html');

let server = http.createServer(function (req, res) {
    if (req.method === "GET") {
        fs.readFile(path.join(__dirname, "view/to_khai_y_te.html"), "utf-8", function (err, data) {
            var cookies = cookie.parse(req.headers.cookie || '');
            data = data.replace("${name}", cookies.name ?? '')
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const info = qs.parse(data);
            res.setHeader('Set-Cookie', cookie.serialize('name', info.name, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7
            }));
            res.statusCode = 302;
            res.setHeader('Location', req.headers.referer || '/');
            return res.end();
        });
        req.on('error', () => {
            console.log('error')
        })
    }
})
server.listen(3000);
