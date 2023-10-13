import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin, isModeratorOrAdmin } from '../middleware/verify_roles'

const router = express.Router()
//PUBLIC ROUTES
router.get('/', controllers.getBooks)



//PRIVATE ROUTES
router.use(verifyToken)
router.use(isAdmin)
router.post('/', controllers.createNewBook)


module.exports= router
