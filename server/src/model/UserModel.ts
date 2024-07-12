import createPayload from "../global/Payload"
import Query from "../global/Query"

class UserModel {

    private TABLE = "user"
    private query

    constructor() {
        this.query = new Query(this.TABLE)
    }

    public async getUser() {
        const data = await this.query.selectQuery()
        return createPayload(data)
    }

    public async addUser(data: object) {
        await this.query.insertQueries(data)                
    }
}

export default UserModel