import express from 'express'
import handleGetPieData from '../controllers/pieChartControllers.js'

const pieChartRoutes = express.Router()

pieChartRoutes.get('/',handleGetPieData)


export {pieChartRoutes}