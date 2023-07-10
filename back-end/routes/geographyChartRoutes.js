import express from 'express'
import handleGetGeoData from '../controllers/geographyChartControllers.js'

const geographyChartRoutes = express.Router()

geographyChartRoutes.get('/',handleGetGeoData)


export {geographyChartRoutes}