const http = require("http");
const fs = require("fs");
const qs = require("qs");

let arrUserInfo = [];
const server = http.createServer(function (req, res) {
    if (req.method == "GET") {
        fs.readFile("./src/view/create_user.html", function (err, data) {
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on("data", chunk => {
            data += chunk;
        })
        req.on("end", () => {
            const userInfo = qs.parse(data);
            arrUserInfo.push(userInfo);
            return res.end("Create successfully");
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});
server.listen(8080, function () {
    console.log("server run")
})
