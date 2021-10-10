import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config'

class jwtServices {
    static sign(payload, jwt_secret = JWT_SECRET, expiry = '1y' ){
        return jwt.sign(payload, jwt_secret, {expiresIn : expiry})
    }

    static verify(token, jwt_secret = JWT_SECRET){
        return jwt.verify(token, jwt_secret)
    }
}

export default jwtServices