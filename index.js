const express = require('express')
const mongoose = require('mongoose')
const todoHandler = require('./routeHandler/todoHandler')
const userHandler = require('./routeHandler/userHandler')
    // express app initialization
const app = express()
require('dotenv').config()
app.use(express.json())
    // database connection with mongoose 
mongoose.connect("mongodb://localhost/todos", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err))

// application routes initialization
app.use('/todo', todoHandler)
app.use('/user', userHandler)
    // default error handler 
const errorHandler = (err, req, res, next) => {
    if (req.headersSent) {
        next(err)
    }
    res.status(500).json({ error: err })
}

app.listen(4000, () => {
    console.log('app listening at port 3000')
})