import mysql from 'mysql';

class Database {

    public conn: mysql.Connection

    constructor() {
        this.conn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : "expressDB"
        })

        this.conn.connect(err => {
            if(err) throw err
            console.log("Connected to MySQL")
        })
    }
}

export default Database