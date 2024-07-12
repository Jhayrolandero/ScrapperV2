import UserModel from "../model/UserModel";

class Get {

    private user 

    constructor() {
        this.user = new UserModel()
    }

    public async getData(model: string) {
        switch(model) {
            case "user":
                return await this.user.getUser()

            default:
                throw "Model doesn't exist!"
        }
    }
}

export default Get