import passport from "passport";
import express, {Router} from "express";
const authRouter = Router();

authRouter.get('/login', (req, res) => {
    res.render("login");
});

authRouter.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

authRouter.get(
    "/google/callback",
    passport.authenticate('google'),
    (req, res) => {
        res.redirect("/book");
    }
);

authRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if(err){
            return next(err)
        }
        if(!user){
            return res.render("error");
        }
        req.login(user, () => {
            res.redirect("/book")
        })
    })(req, res, next)
});

export default authRouter;

