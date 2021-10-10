import customErrorHandler from "../services/customErrorHandler";
import jwtServices from "../services/jwtServices";

const authMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization
    //console.log(req.headers)
    if(!authHeader){
        return next(customErrorHandler.unAuthorize('Credentials are not Correct'))
    }

    const token = authHeader.split(' ')[1]
    try{
        const payload = await jwtServices.verify(token)
        const {_id, role} = payload
        const user = {_id, role}
        req.user = user
        next()
    }
    catch(err){
        return next(customErrorHandler.unAuthorize('Credentials are not Correct'))
    }

}

export default authMiddleware