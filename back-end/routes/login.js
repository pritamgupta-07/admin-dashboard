import express from 'express'
import handleLogin from "../controllers/loginControllers.js";

const loginRoutes = express.Router()

loginRoutes.post('/',handleLogin)

export {loginRoutes}
