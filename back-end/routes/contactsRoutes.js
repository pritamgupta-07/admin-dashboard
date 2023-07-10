import express from 'express'
import handleGetContacts from '../controllers/contactsControllers.js'


const contactsRoutes = express.Router()

contactsRoutes.get('/',handleGetContacts)

export {contactsRoutes}