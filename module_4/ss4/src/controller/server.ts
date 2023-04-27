import {AppDataSource} from "../repository/data-source";
import {Blog} from "../entity/blog";
import express from "express";
import bodyParser from 'body-parser';

const PORT = 3000;


AppDataSource.initialize().then(async connection => {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json());

    const blogRepository = connection.getRepository(Blog);

    app.get("/", async (req, res) => {
        try {
            const blogs = await blogRepository.find();
            if (blogs) {
                res.status(200).json({message: "Success", blogs: blogs})
            }
        } catch (e) {
            res.status(500).json({message: e.mesage})
        }

    });

    app.post("/", async (req, res) => {
        try {
            const {title, content} = req.body;
            if (title && content) {
                const blog = {
                    title: title,
                    content: content
                }
                blogRepository.save(blog).then(result => {
                    res.status(200).json({
                        message: "Create product success",
                        product: result
                    });
                });
            } else {
                res.status(500).json({
                    mesage: "Data wrong format"
                })
            }
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }

    });

    app.delete("/:id", async (req, res) => {
        try {
            let id = req.params.id;
            const blog = await blogRepository.findOneBy({id: id});
            if (blog) {
                blogRepository.remove(blog).then(result => {
                    res.status(200).json({
                        message: "Delete blog success",
                    });
                })
            } else {
                res.status(500).json({
                    mesage: "Blog not found"
                })
            }
        } catch (e) {
            res.status(500).json({
                mesage: "ID wrong format"
            })
        }
    });

    app.patch("/:id", async (req, res) => {
        try {
            const id = req.params.id;
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
                        res.status(200).json({
                            message: "Update blog success",
                        });
                    })
                } else {
                    res.status(500).json({
                        mesage: "Data wrong format"
                    })
                }
            } else {
                res.status(500).json({
                    mesage: "Blog not found"
                })
            }

        } catch (e) {
            res.status(500).json({
                mesage: "ID wrong format"
            })
        }

    });

    app.get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const blog = await blogRepository.findOneBy({id: parseInt(id)});
            if (blog) {
                res.status(200).json({message: "Success", blog: blog})
            } else {
                res.status(500).json({
                    mesage: "Blog not found"
                })
            }
        } catch (e) {
            res.status(500).json({
                mesage: "ID wrong format"
            })
        }
    });

    app.listen(PORT, () => {
        console.log("App running with port: " + PORT)
    })
});
