import express from 'express'
import handleGetBarData from '../controllers/barChartControllers.js'

const barChartRoutes = express.Router()

barChartRoutes.get('/',handleGetBarData)



export { barChartRoutes}