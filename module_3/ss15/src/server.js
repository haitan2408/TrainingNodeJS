const { createServer } = require("http");
const fs = require('fs');
const path = require("path");
const {Server} = require("socket.io");

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css"
};

const httpServer = createServer(function (req, res){
    let temp ="";
    if (req.url === '/') {
        fs.createReadStream(path.join(__dirname, "client/index.html")).pipe(res);
    }
    /* đọc file css/js */
    const filesDefences = req.url.match(/\.js|.css/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(path.join(__dirname,"client/"+req.url)).pipe(res)
    }
});

const io = new Server(httpServer);
const todoList = [];
let index = 0;

io.on('connection', socket => {
    socket.emit('list-question', JSON.parse(fs.readFileSync(path.join(__dirname, "data/data.json"))));
    /* Lắng nghe sự kiện choice từ phái client */
    socket.on('choice', obj => {
        let questions = JSON.parse(fs.readFileSync(path.join(__dirname, "data/data.json")));
        for(let question of questions) {
            if(question.id == obj.id) {
                for(let choice of question.choices) {
                    if(choice.value.toLowerCase() == obj.choice) {
                        choice.votes = ++choice.votes;
                    }
                }
            }

        }
        fs.writeFileSync(path.join(__dirname, "data/data.json"), JSON.stringify([...questions]));
        /* Gửi sự kiện list-question cho tất cả người dùng real-time */
        socket.broadcast.emit('list-question', questions)
    })
})

httpServer.listen(3000, 'localhost', function (){
    console.log('Server running in http://localhost:3000')
})
