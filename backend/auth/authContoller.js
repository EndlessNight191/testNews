const Admin = require('./models/admin');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../configJWT.js');

const generateAccesToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}



class authContoller{
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка валидации', errors})
            }
            const {username, password} = req.body
            const candidate = await Admin.findOne({username})
            if(candidate){
                res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const admin = new Admin({username, password: hashPassword, roles: ['Admin']})
            await admin.save()
            return res.json({message: 'Пользователь зарегестрирован'})
        }catch (e){
            console.log(e)
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body
            const admin = await Admin.findOne({username})
            if(!admin){
                return res.status(400).json({message: `Пользователь с таким "${username}" именем не найден`})
            }
            const validPassword = bcrypt.compareSync(password, admin.password)
            if(!validPassword){
                return res.status(400).json({message: `пороль не верный`})
            }
            const token = generateAccesToken(admin._id, admin.roles)
            return res.json({token})

        }catch (e){
            console.log(e)
        }
    }
}

module.exports = new authContoller()