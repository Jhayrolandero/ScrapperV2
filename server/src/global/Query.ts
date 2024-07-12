// import Database from "../Database";
import Connection from "./Database";

class Query {

    private TABLE

    constructor(table: string) {
        this.TABLE = table
    }

    public async selectQuery() {
        try {
            const sql = `SELECT * FROM ${this.TABLE}`
            const [res, field] = await (await Connection()).execute(sql)

            return res
        } catch(err) {

            throw err
        }
    }

    public async insertQuery(data: string, column: string) {
        try {
            const sql = `INSERT INTO ${this.TABLE} (${column})
                        VALUES (?)`;    

            const [res, field] = await (await Connection()).execute(sql, [data])

            console.log(res)
            console.log(field)
                
        } catch(err) {
            throw err
        }
    }

    public async insertQueries(data: object) {

        try {
            const {columns, placeholder} = this.generateColumn(data)
            const sql = `INSERT INTO ${this.TABLE} (${columns})
                        VALUES (${placeholder})`

            const [res, field] = await (await Connection()).execute(sql, this.generateData(data))

            console.log(res)
            console.log(field)
        } catch(err) {
            throw err
        }
    }

    private generateColumn(data: object) {
        const copy = {...data}
        const columns = Object.keys(copy)
        const placeholder = Array.from({length:columns.length}, () => "?") 

        return {columns: columns.toString(), placeholder: placeholder.toString()}
    }

    private generateData(data:object) {
        const copy = {...data}
        
        return Object.values(copy)
    }
}

export default Query