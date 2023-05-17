import express, {Router} from "express";
import {UserModel} from "../model/use.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {logger} from "../logger/winston";

const authRouter = Router();

authRouter.get('/login', (req, res) => {
    try {
        throw new Error("log error");
    } catch (e) {
        logger.error(e);
    }
    res.render("login");
});

authRouter.post('/login', async (req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (user) {
            const comparePass = await bcrypt.compare(req.body.password, user.password);
            if (!comparePass) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID",
                });
            }
            let payload = {
                user_id: user["id"],
                username: user["username"],
                role: user["role"]
            }

            const token = jwt.sign(payload, '123456789', {
                expiresIn: 36000,
            });
            return res.json({token: token, code: 200})
        } else {
            return res.json({err: 'Email has been used'});
        }
    } catch (err) {
        return res.json({err: err})
    }
});

export default authRouter;

