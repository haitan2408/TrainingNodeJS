import express from "express";
import bodyParser from 'body-parser';

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', "./src/views");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (request, response, next, options) => {
        response.render("error408")
    },
    standardHeaders: true,
    legacyHeaders: false,
});

//all request
app.use(limiter);

const tokenCorrect = "123456789";

app.use((req, res, next) => {
    try {
        let token = req.query.token;
        if (token === tokenCorrect) {
            next()
        } else {
            res.render("error403");
        }
    } catch (e) {
        next(e);
    }

});

app.get('/', (req, res) => {
    res.send('Thành công')
});

app.use((error, req, res, next) => {
    if (error.type == 'time-out') {
        res.render("error408");
    }
    else {
        res.render("error500");
    }
});

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
});
