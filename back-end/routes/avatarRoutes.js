import express from 'express'
import upload from '../services/multerConfig.js'
import { handleDeleteAvatar, handleGetAvatar, handleUpdateAvatar, handleUploadAvatar } from '../controllers/avatarControllers.js'

const avatarRoutes = express.Router()

avatarRoutes.get('/:id',handleGetAvatar)

avatarRoutes.post('/upload/:id',upload.single('image'), handleUploadAvatar)

avatarRoutes.put('/update/:pid',upload.single('image'), handleUpdateAvatar)

avatarRoutes.delete('/delete/:pid',handleDeleteAvatar)

export {avatarRoutes}