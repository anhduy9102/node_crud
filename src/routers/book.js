import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isModeratorOrAdmin } from '../middleware/verify_roles'
import uploadCloud from '../middleware/uploader'

const router = express.Router()
//PUBLIC ROUTES
router.get('/', controllers.getBooks)



//PRIVATE ROUTES
router.use(verifyToken)
router.use(isModeratorOrAdmin)
router.post('/',uploadCloud.single('image'), controllers.createNewBook)
router.put('/',uploadCloud.single('image'), controllers.updateBook)
router.delete('/', controllers.deleteBook)


module.exports= router
