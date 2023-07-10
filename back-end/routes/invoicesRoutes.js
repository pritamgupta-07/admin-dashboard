import express from 'express'
import {handleGetInvoices} from '../controllers/invoiceControllers.js'



const invoiceRoutes = express.Router()

invoiceRoutes.get('/',handleGetInvoices)

export {invoiceRoutes}