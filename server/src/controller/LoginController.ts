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
            this.page = await this.browser.newPage()
    
            await this.page.goto(process.env.URL!);
            
            // console.log(await this.getPageResponse())
            if(await this.getPageResponse()) {
                return "Can't reach GCLamp"
            }
    
            await this.page.setViewport({width: 1980, height: 1024});
    
            // Type into search box.
            await this.page.locator('#param1').fill(this.USERNAME); // Username
            await this.page.locator('#param2').fill(this.PASSWORD); // Password
            await this.page.keyboard.press('Enter');

            if(await this.getPageResponse()) {
                return "Failed to Login"
            }
        
            // Wait for navigation
            await this.page.locator('.list').wait()
    
            // Redirect to todolist
            await this.page.goto(process.env.URLTODOLIST!);    

            return "Logged In!"

        } catch(err) {
            throw err
        }

    }

    private async getPageResponse() {
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
            }, 10000); // Adjust timeout as needed
        });
    }
    

}


export default LoginController;