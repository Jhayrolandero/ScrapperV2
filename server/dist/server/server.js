"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controller 
const PostController_1 = __importDefault(require("../src/controller/PostController"));
const GetController_1 = __importDefault(require("../src/controller/GetController"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const web_push_1 = __importDefault(require("web-push"));
web_push_1.default.setVapidDetails('mailto:xjaylandero23@gmail.com', process.env.PUBLIC_KEYS, process.env.PRIVATE_KEYS);
// const db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : "expressDB"
// })
// db.connect(err => {
//   if(err) throw err
//   console.log("Connection Done")
// })
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json()); // to support JSON-encoded bodies
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
const PORT = 5000;
const post = new PostController_1.default();
const get = new GetController_1.default();
app.get("/", (req, res) => {
    res.json({ msg: 'This is CORS-enabled for all origins!' });
});
app.get("/user", (req, res) => {
    get.getData("user");
    res.send("Hii");
});
app.post("/user", (req, res) => {
    post.addData("user", req.body.title);
    // console.log(req.body)
    res.send("Working");
});
app.post("/", async (req, res) => {
    // app.post("/", async (req: Request<{}, {}, LoginCredentials>, res) => {
    const subscription = req.body;
    console.log(JSON.stringify(subscription));
    const payload = "Hello";
    const options = {
        TTL: req.body.ttl,
    };
    // console.log(req.body.delay)
    setTimeout(() => {
        web_push_1.default
            .sendNotification(subscription, payload, options)
            .then(() => res.sendStatus(201))
            .catch(() => res.sendStatus(500));
    }, 3000);
});
app.post("/login", (req, res) => {
    const credentials = req.body.username;
    post.addData("user", credentials);
});
app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`);
});
