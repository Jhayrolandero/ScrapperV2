import jwt from "jsonwebtoken";
import 'dotenv/config'


const JWT_SECRETKEY = process.env.JWT_SECRET_KEY!
const generateToken = () => {

const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (1 * 20),
    data: "bar"
}, JWT_SECRETKEY)


return token
}

const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRETKEY)
        return decoded
    } catch(err: any) {
        switch(err.name) {
            case "TokenExpiredError":
                return "Token Expired"
            case "JsonWebTokenError":
                return "Invalid Signature"
            default:
                return "Invalid Token"
        }
    }

}


export {generateToken, verifyToken}