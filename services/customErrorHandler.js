
class customErrorHandler extends Error {
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }

    static alreadyExist(message){
        return new customErrorHandler(409, message)
    }

    static unAuthorize(message){
        return new customErrorHandler(401, message)
    }
}

export default customErrorHandler