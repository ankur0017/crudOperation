import dotenv from 'dotenv'
dotenv.config()

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URI,
    JWT_SECRET
} = process.env