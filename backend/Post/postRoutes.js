const Router = require('express')
const router = new Router()
const controller = require('./postContoller')
const {check} = require('express-validator')
const authMiddleweare = require('../middleweare/authMiddleweare')

router.post('/create', [
    check('nameHeader', "Заголовок не может быть пустым").notEmpty(),
    check('text', "текст должен быть длинее 20 символов").isLength({min: 20}),
], authMiddleweare(['Admin']), controller.createPost)
router.post('/access',  authMiddleweare(['Admin']), controller.access)
router.put('/update', authMiddleweare(['Admin']), controller.putPost)
router.delete('/delete', authMiddleweare(['Admin']), controller.deletePost)
router.get('/', controller.getPost)

module.exports = router