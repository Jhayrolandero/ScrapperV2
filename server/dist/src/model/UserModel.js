"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
class UserModel extends Database_1.default {
    getUser() {
        const sql = "SELECT * FROM user";
        this.conn.query(sql, (err, res, field) => {
            if (err)
                throw err;
            console.log(res);
            console.log(field);
        });
    }
}
exports.default = UserModel;
