"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = __importDefault(require("../global/Query"));
class UserModel {
    constructor() {
        this.TABLE = "user";
        this.query = new Query_1.default(this.TABLE);
    }
    getUser() {
        this.query.selectQuery();
    }
    addUser(data) {
        this.query.insertQuery(data, "username");
        // const sql = `INSERT INTO ${this.TABLE} (username)
        //             VALUES (?)`;    
        // this.conn.query(
        //     sql, 
        //     [data],
        //     (err, res, field) => {
        //         if(err) throw err
        //         console.log(res)
        //         console.log(field)
        //     }
        // )
    }
}
exports.default = UserModel;
