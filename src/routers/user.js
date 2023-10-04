import user from '../controllers/user'

const router= require('express').Router()

router.get('/' ,  user.getUsers)

module.exports= router
