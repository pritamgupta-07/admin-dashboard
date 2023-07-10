import express from 'express'
import { handleGetDashboardData } from '../controllers/dashboardDataControllers.js'

const dashboardDataRoutes = express.Router()

dashboardDataRoutes.get('/',handleGetDashboardData)


export {dashboardDataRoutes}