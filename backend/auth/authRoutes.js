const Router = require('express')
const router = new Router()
const controller = require('./authContoller')
const {check} = require('express-validator')


router.post('/adminCreate', [
    check('username', "Имя пользывателя не может быть пустым").notEmpty(),
    check('password', "Пороль должен быть длинее 4 символов и не более 12").isLength({min: 4, max : 12}),
], controller.registration)
router.post('/adminLogin', [
    check('username', "Имя пользывателя не может быть пустым").notEmpty(),
    check('password', "Пороль должен быть длинее 4 символов и не более 12").isLength({min: 4, max : 12}),
], controller.login)

module.exports = router