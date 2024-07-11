"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Database {
    constructor() {
        this.conn = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: "expressDB"
        });
        this.conn.connect(err => {
            if (err)
                throw err;
            console.log("Connected to MySQL");
        });
    }
}
exports.default = Database;
