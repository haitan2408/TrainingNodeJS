import {AppDataSource} from "../repository/data-source";
import {Blog} from "../entity/blog";
import express from "express";
import bodyParser from 'body-parser';
import session from 'express-session';

const PORT = 3000;

declare module 'express-session' {
    export interface SessionData {
        success: string;
    }
}


AppDataSource.initialize().then(async connection => {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', "./src/views");
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json());

    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'somesecret',
        cookie: {maxAge: 60000}
    }));

    const blogRepository = connection.getRepository(Blog);

    app.get("/", async (req, res) => {
        let success = "";
        let sessionData = req.session;
        if (sessionData) {
            success = sessionData.success;
            sessionData.success = null;
        }
        const blogs = await blogRepository.find();
        res.render("list", {data: blogs, success: success})
    });

    app.get("/create", async (req, res) => {
        res.render("create");
    });

    app.post("/create", async (req, res) => {
        const {title, content} = req.body;
        if (title && content) {
            const blog = {
                title: title,
                content: content
            }
            blogRepository.save(blog).then(result => {
                let sessionData = req.session;
                sessionData.success = "create";
                res.redirect("/");
            })
        } else {
            res.render("error");
        }
    });

    app.post("/delete", async (req, res) => {
        if (req.body.idBlog) {
            let id = req.body.idBlog;
            const blog = await blogRepository.findOneBy({id: id});
            if (blog) {
                blogRepository.remove(blog).then(result => {
                    req.session.success = "delete";
                    res.redirect("/");
                })
            } else {
                res.render("error");
            }
        } else {
            res.render("error");
        }
    });

    app.get("/update/:id", async (req, res) => {
        const id = req.params.id;
        if (id) {
            const blog = await blogRepository.findOneBy({id: parseInt(id)});
            if (blog) {
                res.render("update", {data: blog})
            } else {
                res.render("error");
            }
        } else {
            res.render("error");
        }
    });

    app.post("/update/:id", async (req, res) => {
        const id = req.params.id;
        if (id) {
            const blog = await blogRepository.findOneBy({id: parseInt(id)});
            if (blog) {
                const {title, content} = req.body;
                if (title && content) {
                    const blog = {
                        id: id,
                        title: title,
                        content: content
                    }
                    blogRepository.update({id: id}, blog).then(result => {
                        let sessionData = req.session;
                        sessionData.success = "update";
                        res.redirect("/");
                    })
                } else {
                    res.render("error");
                }
            } else {
                res.render("error");
            }
        } else {
            res.render("error");
        }
    });

    app.listen(PORT, () => {
        console.log("App running with port: " + PORT)
    })
});
