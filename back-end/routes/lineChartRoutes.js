import express from 'express'
import handleGetLineData from '../controllers/lineChartControllers.js'


const lineChartRoutes = express.Router()

lineChartRoutes.get('/',handleGetLineData)



export {lineChartRoutes}