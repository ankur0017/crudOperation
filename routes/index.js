import express from "express"
import { registerController } from "../controllers"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post('/register', registerController.register)
router.get('/getAll', registerController.getAllUser)
router.put('/update/:user_id',[authMiddleware], registerController.updateUser)

export default router