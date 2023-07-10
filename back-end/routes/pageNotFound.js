import express from 'express'
import { handlePageNotFound } from '../controllers/pageNotFoundControllers.js'

const pageNotFoundRoutes = express.Router()


pageNotFoundRoutes.get('/',handlePageNotFound)



export {pageNotFoundRoutes}