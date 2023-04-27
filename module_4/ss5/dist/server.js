"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', "./src/views");
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (request, response, next, options) => {
        response.render("error408");
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
const tokenCorrect = "123456789";
app.use((req, res, next) => {
    try {
        let token = req.query.token;
        if (token === tokenCorrect) {
            next();
        }
        else {
            res.render("error403");
        }
    }
    catch (e) {
        next(e);
    }
});
app.get('/', (req, res) => {
    res.send('Thành công');
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
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=server.js.map