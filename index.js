const express = require('express');
const  cors = require('cors');
require('dotenv').config()
const initRoutes = require('./src/routers')
require('./connection_database')

const app= express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods:['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

initRoutes(app)

const PORT= process.env.PORT || 8888

const listener = app.listen(PORT,() =>{
    console.log(" server is running" + listener.address().port);
})

