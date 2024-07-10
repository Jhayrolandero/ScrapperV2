// Types
import { LoginCredentials } from '../src/LoginCredentials';

// Controller 
import LoginController from '../src/controller/LoginController';

import 'dotenv/config'
import express, {Request } from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import webPush from 'web-push';
import PushNotifications from 'node-pushnotifications';

// webPush.setVapidDetails(
//     'mailto:xjaylandero23@gmail.com',
//     process.env.PUBLIC_KEYS!,
//     process.env.PRIVATE_KEYS!
// );

const settings: PushNotifications.Settings = {
    web: {
      vapidDetails: {
        subject: "mailto:xjaylandero23@gmail.com", // REPLACE_WITH_YOUR_EMAIL
        publicKey: process.env.PUBLIC_KEYS!,
        privateKey: process.env.PRIVATE_KEYS!,
      },
      gcmAPIKey: "gcmkey",
      TTL: 2419200,
      contentEncoding: "aes128gcm",
      headers: {},
    },
    isAlwaysUseFCM: false,
  };
// const vapidKeys = webPush.generateVAPIDKeys();

// console.log('Public Key:', vapidKeys.publicKey);
// console.log('Private Key:', vapidKeys.privateKey);

const app = express()
app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const PORT = 5000

app.get("/", (req, res) => {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

// const getWeb = async() => {
//     // Generate the Response object
//   const response = await fetch(process.env.URL!);
//   console.log(response.status)
//   if (response.ok) {
//     // Get JSON value from the response body
//     return response.json();
//   }
//   throw new Error("*** PHP file not found");
// }

app.post("/", async (req, res) => {
// app.post("/", async (req: Request<{}, {}, LoginCredentials>, res) => {

    const subscription = req.body;
  console.log(subscription)
    const push = new PushNotifications(settings)
    // const push = new Notification()

    const payload : PushNotifications.Data = { title : "Hiii", body: "Some Content" }
    push.send(subscription, payload, (err, res) => {
        if(err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
    // res.json({msg: "a"})
    // getWeb()
    // const loginCtrl = new LoginController(req.body.username, req.body.password)

    // const msg =  await loginCtrl.login()

    // res.json({msg})
    // if(req.body.username === "admin" && req.body.password === "123") {
    //     res.json({msg: "Logon"})
    // } else {
    //     res.json({msg: "Wrong Credentials"})
    // }
})


app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})