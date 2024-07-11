// Controller 
import Post from '../src/controller/PostController';
import Get from '../src/controller/GetController';

import 'dotenv/config'
import express, {Request } from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import webPush from 'web-push';
import PushNotifications from 'node-pushnotifications';

webPush.setVapidDetails(
    'mailto:xjaylandero23@gmail.com',
    process.env.PUBLIC_KEYS!,
    process.env.PRIVATE_KEYS!
);

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

const app = express()
app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const PORT = 5000

const post = new Post()
const get = new Get()


app.get("/", (req, res) => {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get("/user", (req, res) => {
  get.getData("user")
  res.send("Hii")
})

app.post("/user", (req, res) => {

  post.addData("user", req.body.title)
  // console.log(req.body)
  res.send("Working")
})
app.post("/", async (req, res) => {
// app.post("/", async (req: Request<{}, {}, LoginCredentials>, res) => {

    const subscription = req.body;
    const payload = "Hello"
    const options = {
      TTL: req.body.ttl,
    };

    // console.log(req.body.delay)
    setTimeout(() => {

    webPush
    .sendNotification(subscription, payload, options)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
  }, 3000)
})


app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})