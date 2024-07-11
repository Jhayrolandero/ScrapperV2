"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
require("dotenv/config");
class LoginController {
    constructor(USERNAME, PASSWORD) {
        this.USERNAME = USERNAME;
        this.PASSWORD = PASSWORD;
        this.HttpResponse = [];
    }
    async login() {
        try {
            this.browser = await puppeteer_1.default.launch({ headless: false });
            this.page = await this.browser.newPage();
            await this.page.goto(process.env.URL);
            // console.log(await this.getPageResponse())
            if (await this.getPageResponse()) {
                return "Can't reach GCLamp";
            }
            await this.page.setViewport({ width: 1980, height: 1024 });
            // Type into search box.
            await this.page.locator('#param1').fill(this.USERNAME); // Username
            await this.page.locator('#param2').fill(this.PASSWORD); // Password
            await this.page.keyboard.press('Enter');
            if (await this.getPageResponse()) {
                return "Failed to Login";
            }
            // this.page.on('response', response => {
            //     const uri = response.url().split('/')
            //     const loginEndpoint = uri[uri.length - 1]
            //     const res: HttpResponseCode = {
            //         endpoint: loginEndpoint,
            //         statusCode: response.status()
            //     } 
            //     this.HttpResponse = [...this.HttpResponse, res]
            //     console.log(this.HttpResponse)
            //     // const promise = Promise.resolve(response.text())
            //     // // console.log(promise)
            //     // promise.then((value) => {
            //     //     console.log(value);
            //     //     // Expected output: 123
            //     // });
            // // console.log(response.url() + " - " + response.status());
            // })
            // Wait for navigation
            await this.page.locator('.list').wait();
            // Redirect to todolist
            await this.page.goto(process.env.URLTODOLIST);
            return "Logged In!";
        }
        catch (err) {
            console.log(err);
        }
    }
    async getPageResponse() {
        let badResponse = false;
        const page = this.page;
        if (!page) {
            return badResponse;
        }
        return new Promise((resolve, reject) => {
            page.on('response', response => {
                console.log("==================================");
                console.log(response.url() + " - " + response.status() + " - " + response.statusText());
                const uri = response.url().split('/');
                console.log(uri);
                if (uri.includes("pageerror")) {
                    badResponse = true;
                    resolve(badResponse);
                    return;
                }
                if (uri.includes("userlogin") && response.status() == 403) {
                    badResponse = true;
                    resolve(badResponse);
                    return;
                }
                console.log("==================================");
            });
            // Timeout to ensure the promise resolves even if no 'response' event is triggered
            setTimeout(() => {
                resolve(badResponse);
            }, 5000); // Adjust timeout as needed
        });
    }
}
exports.default = LoginController;
