import express from 'express'
import handleGetTransactionData from '../controllers/transactionContronners.js'


const transactionRoutes= express.Router()

transactionRoutes.get('/',handleGetTransactionData)


export { transactionRoutes}