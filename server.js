import express from 'express'
import { APP_PORT, DB_URI } from './config'
import errorHandler from './middlewares/errorHandler'
import router from './routes'
import mongoose from 'mongoose'
const app = express()

app.use(express.json())

//database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=>{ console.log('DB CONNECTED..')})

app.use('/api',router)

app.use(errorHandler)
app.listen(APP_PORT, ()=> console.log(`Server is listning at port no ${APP_PORT}`))