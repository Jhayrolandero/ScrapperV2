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

app.post("/", async (req: Request<{}, {}, LoginCredentials>, res) => {

    // getWeb()
    const loginCtrl = new LoginController(req.body.username, req.body.password)

    const msg =  await loginCtrl.login()

    res.json({msg})
    // if(req.body.username === "admin" && req.body.password === "123") {
    //     res.json({msg: "Logon"})
    // } else {
    //     res.json({msg: "Wrong Credentials"})
    // }
})


app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})