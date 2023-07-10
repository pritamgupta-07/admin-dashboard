import express from 'express'
import { handleForgotPassword, handleResetPassword } from '../controllers/passwordRecoveryControllers.js'

const forgotPasswordRoutes = express.Router()

forgotPasswordRoutes.post('/',handleForgotPassword)

forgotPasswordRoutes.post('/reset/:id/:token',handleResetPassword)



export {forgotPasswordRoutes}
