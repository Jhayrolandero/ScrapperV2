import Query from "../global/Query"

class SubModel {

    private TABLE = "subscription"
    private query

    constructor() {
        this.query = new Query(this.TABLE)
    }

    public getSub() {
        this.query.selectQuery()
    }

    public addSub(data:string) {
    }
}

export default SubModel