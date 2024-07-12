import UserModel from "../model/UserModel";

class Post {

    private user

    constructor() {
        this.user = new UserModel()
    }

    public async addData(model: string, data: object) {
        switch(model) {
            case "user":
                await this.user.addUser(data)
                break
            default:
                throw "Not Found"
        }
    }
}

export default Post