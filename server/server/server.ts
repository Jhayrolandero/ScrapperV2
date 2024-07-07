// Types
import { LoginCredentials } from '../src/LoginCredentials';

import puppeteer from 'puppeteer';
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

// Launch the browser and open a new blank page
async function put () {
// Launch the browser and open a new blank page
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

await page.goto('https://gordoncollegeccs.edu.ph/ccs/students/lamp/#/login');
await page.setViewport({width: 1980, height: 1024});

// Type into search box.
await page.locator('#param1').fill('202210274@gordoncollege.edu.ph');
await page.locator('#param2').fill('nope');

// Enter to Login
await page.keyboard.press('Enter');

// Wait for navigation
await page.locator('.list').wait()

// Redirect to todolist
await page.goto('https://gordoncollegeccs.edu.ph/ccs/students/lamp/#/main/todolist');
}

// put()

app.get("/", (req, res) => {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.post("/", (req: Request<{}, {}, LoginCredentials>, res) => {

    if(req.body.username === "admin" && req.body.password === "123") {
        res.json({msg: "Logon"})
    } else {
        res.json({msg: "Wrong Credentials"})
    }
})


app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})