import { DEBUG_MODE } from "../config"
import { ValidationError } from "joi"
import customErrorHandler from "../services/customErrorHandler"

const errorHandler = (err, req, res, next)=>{
    let status = 500
    let data = {
        message: "Internal Server Error",
        ...(DEBUG_MODE === 'true' && {originalMessage: err.message})
    }
    
    if(err instanceof ValidationError){
        status = 422
        data = {
            message: err.message
        }
    }

    if(err instanceof customErrorHandler){
        status = err.status
        data = {
            message: err.message
        }
    }

    return res.status(status).json(data)

}

export default errorHandler