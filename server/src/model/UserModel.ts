import Database from "../Database";

class UserModel extends Database {

    private TABLE = "user"

    public getUser() {
        const sql = "SELECT * FROM user"

        this.conn.query(sql, (err, res, field) => {
            if(err) throw err

            console.log(res)
            console.log(field)
        })
    }

    public addUser(data: string) {
        const sql = `INSERT INTO ${this.TABLE} (username)
                    VALUES (?)`;    

        this.conn.query(
            sql, 
            [data],
            (err, res, field) => {
                if(err) throw err

                console.log(res)
                console.log(field)
            }
        )
                
    }
}

export default UserModel