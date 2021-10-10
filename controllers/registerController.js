import bcrypt from 'bcrypt'
import {User} from '../models'
import Joi from 'joi'
import jwtServices from '../services/jwtServices'
import customErrorHandler from '../services/customErrorHandler'

const registerController = {
    async register(req, res, next){
        const {email, password, confirmPassword, name} = req.body
        // validate the req
        const userSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            confirmPassword: Joi.ref('password')
        })

        const {error} = userSchema.validate(req.body)
        if(error){
            return next(error)
        }

        //check if email already taken 
        try{
            const emailAlreadyTaken = await User.exists({email})
            if(emailAlreadyTaken){
                return next(customErrorHandler.alreadyExist('This Email is Already Exist'))
            }

            //hashing password
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt )
            // create new user in database
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            const newUser = await user.save()

            //return token to newly registered user
            const access_token = jwtServices.sign({_id: newUser._id , role: newUser.role})
            res.json({token: access_token})

        }
        catch(err){
            next(err)
        }
    },

    async updateUser(req, res, next){
        const {name} = req.body
        const user_id = req.params.user_id
        const {_id} = req.user
        //console.log('name, _id, paramsId is', user_id)
        try{
            const user = await User.findOne({_id})
            if(user._id != user_id ){
                return next(customErrorHandler.unAuthorize('You are not Authorize  To edit it '))
            }
            const updatedUser = await User.updateOne({_id}, {$set:{ name}, $currentDate: {lastModified: true}})

            return res.json(updatedUser)

        }
        catch(err){
            next(err)
        }
    },

    async getAllUser(req, res, next){

        try{
            const users = await User.find({}).select('-password -__v')
            return res.json(users)
        }
        catch(err){
            next(err)
        }
    }
    
}

export default registerController