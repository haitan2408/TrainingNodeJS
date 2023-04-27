"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../repository/data-source");
const blog_1 = require("../entity/blog");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.set('view engine', 'ejs');
    app.set('views', "./src/views");
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use((0, express_session_1.default)({
        resave: true,
        saveUninitialized: true,
        secret: 'somesecret',
        cookie: { maxAge: 60000 }
    }));
    const blogRepository = connection.getRepository(blog_1.Blog);
    app.get("/", async (req, res) => {
        let success = "";
        let sessionData = req.session;
        if (sessionData) {
            success = sessionData.success;
            sessionData.success = null;
        }
        const blogs = await blogRepository.find();
        res.render("list", { data: blogs, success: success });
    });
    app.get("/create", async (req, res) => {
        res.render("create");
    });
    app.post("/create", async (req, res) => {
        const { title, content } = req.body;
        if (title && content) {
            const blog = {
                title: title,
                content: content
            };
            blogRepository.save(blog).then(result => {
                let sessionData = req.session;
                sessionData.success = "create";
                res.redirect("/");
            });
        }
        else {
            res.render("error");
        }
    });
    app.post("/delete", async (req, res) => {
        if (req.body.idBlog) {
            let id = req.body.idBlog;
            const blog = await blogRepository.findOneBy({ id: id });
            if (blog) {
                blogRepository.remove(blog).then(result => {
                    req.session.success = "delete";
                    res.redirect("/");
                });
            }
            else {
                res.render("error");
            }
        }
        else {
            res.render("error");
        }
    });
    app.get("/update/:id", async (req, res) => {
        const id = req.params.id;
        if (id) {
            const blog = await blogRepository.findOneBy({ id: parseInt(id) });
            if (blog) {
                res.render("update", { data: blog });
            }
            else {
                res.render("error");
            }
        }
        else {
            res.render("error");
        }
    });
    app.post("/update/:id", async (req, res) => {
        const id = req.params.id;
        if (id) {
            const blog = await blogRepository.findOneBy({ id: parseInt(id) });
            if (blog) {
                const { title, content } = req.body;
                if (title && content) {
                    const blog = {
                        id: id,
                        title: title,
                        content: content
                    };
                    blogRepository.update({ id: id }, blog).then(result => {
                        let sessionData = req.session;
                        sessionData.success = "update";
                        res.redirect("/");
                    });
                }
                else {
                    res.render("error");
                }
            }
            else {
                res.render("error");
            }
        }
        else {
            res.render("error");
        }
    });
    app.listen(PORT, () => {
        console.log("App running with port: " + PORT);
    });
});
//# sourceMappingURL=server.js.map