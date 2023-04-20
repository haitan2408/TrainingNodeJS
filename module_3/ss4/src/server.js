const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (request, response) {
    if (request.method === "GET") {
        fs.readFile('./src/view/todo.html', function (err, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            return response.end();
        })
    } else {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        })
        request.on('end', () => {
            const todoTask = qs.parse(data);
            fs.readFile('./src/view/display.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{todoTask}', todoTask.nameTask);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(datahtml);
                return response.end();
            });
        })
        request.on('error', () => {
            console.log('error')
        })
    }
});
server.listen(8080, function () {
    console.log(("Server run"))
})

