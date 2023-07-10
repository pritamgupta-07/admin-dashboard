import express from 'express'
import{ handleGetGeoFeatures } from '../controllers/geographyFeaturesControllers.js'

const geographyFeaturesRoutes = express.Router()

geographyFeaturesRoutes.get('/',handleGetGeoFeatures)


export {geographyFeaturesRoutes}