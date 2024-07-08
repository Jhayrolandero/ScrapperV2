// Types
import { LoginCredentials } from '../src/LoginCredentials';

// Controller 
import LoginController from '../src/controller/LoginController';

import 'dotenv/config'
import express, {Request } from 'express';
import cors from "cors";
import bodyParser from 'body-parser';

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

app.post("/", async (req: Request<{}, {}, LoginCredentials>, res) => {

    const loginCtrl = new LoginController(req.body.username, req.body.password)

    await loginCtrl.login()
    if(req.body.username === "admin" && req.body.password === "123") {
        res.json({msg: "Logon"})
    } else {
        res.json({msg: "Wrong Credentials"})
    }
})


app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})