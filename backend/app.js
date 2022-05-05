const express = require('express')
const mongoose = require("mongoose");
const postRoutes = require('./Post/postRoutes')
const authRoutes = require('./auth/authRoutes')
const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')

const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('static'))

app.use("/post", cors(), postRoutes)
app.use("/auth", cors(), authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

async function startApp(){
    try{
        await mongoose.connect('mongodb://Vlad:0000@cluster0-shard-00-00.5usrp.mongodb.net:27017,cluster0-shard-00-01.5usrp.mongodb.net:27017,cluster0-shard-00-02.5usrp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-141dm8-shard-0&authSource=admin&retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log('сервер работает')
        })
    }catch (e) {
        console.log(e)
    }
}

startApp()