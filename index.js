const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/api_mobile_app')

sequelize
    .authenticate()
    .then(() => {
        console.log('conected to db')
    })
    .catch((err) => {
        console.log('unable connect to db ', err)
    })

app.get("/", (req, res) => {
    res.json({mes: 'app is started'})
})

app.listen(3051, () => {
    console.log('server is running')
})