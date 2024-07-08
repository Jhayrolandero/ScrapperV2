import puppeteer, { Browser, Page } from 'puppeteer';
import 'dotenv/config'
import { HttpResponseCode } from '../HttpResponseCode';

class LoginController {

    private USERNAME: string
    private PASSWORD: string
    private HttpResponse: HttpResponseCode[]

    private browser: Browser | undefined
    private page: Page | undefined

    constructor(USERNAME: string, PASSWORD: string) {
        this.USERNAME = USERNAME
        this.PASSWORD = PASSWORD
        this.HttpResponse = []
    }

    async login() {
        try {
            this.browser = await puppeteer.launch()
            // this.browser = await puppeteer.launch({headless:false})
            this.page = await this.browser.newPage()
            // const browser = await puppeteer.launch({headless:false});
            // const page = await browser.newPage();
    
            await this.page.goto(process.env.URL!);
            this.getPageResponse()
    
            await this.page.setViewport({width: 1980, height: 1024});
    
            // Type into search box.
            await this.page.locator('#param1').fill(this.USERNAME); // Username
            await this.page.locator('#param2').fill(this.PASSWORD); // Password
    
            this.getPageResponse()

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
    
            await this.page.keyboard.press('Enter');
    
            // Wait for navigation
            await this.page.locator('.list').wait()
    
            // Redirect to todolist
            await this.page.goto(process.env.URLTODOLIST!);
    
        } catch(err) {

            console.log(err)
        }

    }

    getPageResponse() {
        this.page!.on('response', response => {
            console.log("==================================")
            console.log(response.url())
            const uri = response.url().split('/')
            const loginEndpoint = uri[uri.length - 1]

            const res: HttpResponseCode = {
                endpoint: loginEndpoint,
                statusCode: response.status()
            } 

            this.HttpResponse = [...this.HttpResponse, res]
            console.log(this.HttpResponse)
            // const promise = Promise.resolve(response.text())
            // // console.log(promise)
            // promise.then((value) => {
            //     console.log(value);
            //     // Expected output: 123
            // });
        // console.log(response.url() + " - " + response.status());
        console.log("==================================")

        })
    }

}


export default LoginController;