import UserModel from "../model/UserModel";

class Post {

    private user

    constructor() {
        this.user = new UserModel()
    }

    public addData(model: string, data: string) {
        switch(model) {
            case "user":
                this.user.addUser(data)
                break
            default:
                throw "Not Found"
        }
    }
}

export default Post