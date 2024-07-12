// Controller 
import Post from '../src/controller/PostController';
import Get from '../src/controller/GetController';

import 'dotenv/config'
import express, {Request, Response } from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import webPush from 'web-push';
import { LoginCredentials } from '../src/LoginCredentials';
import { QueryRes } from '../src/QueryRes';
import LoginController from '../src/controller/LoginController';

webPush.setVapidDetails(
    'mailto:xjaylandero23@gmail.com',
    process.env.PUBLIC_KEYS!,
    process.env.PRIVATE_KEYS!
);

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

app.get("/user", (req, res: Response<QueryRes, any>) => {
  get.getData("user")
  .then(data => res.json(data))
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

app.post("/user", (req, res) => {
  post.addData("user", req.body.title)
  res.send("Working")
})
app.post("/", async (req, res) => {
    const subscription = req.body;
    console.log(JSON.stringify(subscription))
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

app.post("/login", (req: Request<any, any, LoginCredentials>, res) => {

  const username = req.body.username
  const password = req.body.password
  const subscribe = req.body.subscribe

  const loginLamp = new LoginController(username, password)

  loginLamp.login()
  .then(x => {
    if(subscribe && x === "Logged In!") {
      post.addData("user", {username, password, subscribe})
    }
    res.json({msg: x})
  })
  .catch(err => {

    console.log(err)
    res.sendStatus(500)
  })
  // const credentials = req.body
  // // console.log(credentials)
  // post.addData("user", credentials)
  // res.json({msg: "Yow"})
})


app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})