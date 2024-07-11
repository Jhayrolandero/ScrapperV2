import UserModel from "../model/UserModel";

class Get {

    private user 

    constructor() {
        this.user = new UserModel()
    }

    public getData(model: string) {
        switch(model) {
            case "user":
                this.user.getUser()
                break;

            default:
                throw "Model doesn't exist!"
        }
    }
}

export default Get