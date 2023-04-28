import {Router} from 'express';
import {PhoneBook} from "../model/phone_book";

const phoneBookRouter = Router();

declare module 'express-session' {
    export interface SessionData {
        success: string;
    }
}
phoneBookRouter.get("", async (req, res) => {
    try {
        let success = "";
        let sessionData = req.session;
        if (sessionData) {
            success = sessionData.success;
            sessionData.success = null;
        }
        let page = 0;
        if (req.query.page) {
            page = +req.query.page;
            if (page < 0) page = 0;
        }
        const phoneBooks = await PhoneBook.find().limit(2).skip(page * 2);
        res.render("list", {data: phoneBooks, success: success, page: page});
    } catch (e) {
        res.render("error");
    }
});

phoneBookRouter.get("/create", async (req, res) => {
    res.render("create");
});

phoneBookRouter.post('/create', async (req, res) => {
    try {
        const phoneBook = new PhoneBook(req.body)
        const phoneBookSave = await phoneBook.save();
        if (phoneBookSave) {
            let sessionData = req.session;
            sessionData.success = "create";
            res.redirect("/phoneBook");
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});

phoneBookRouter.post('/delete', async (req, res) => {
    try {
        const id = req.body.idPhone;
        if (id) {
            const book = await PhoneBook.findById(id);
            if (book) {
                await book.deleteOne();
                req.session.success = "delete";
                res.redirect("/phoneBook");
            } else {
                res.render("error");
            }
        } else {
            res.render("error");
        }
    } catch (e) {
        res.render("error");
    }
})

export default phoneBookRouter;
