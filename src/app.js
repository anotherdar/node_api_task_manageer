const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

require('./db/mongoose')

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const authRouter = require('./routes/auth')
const avatarRouter = require('./routes/avatar')

const app = express()

app.use(express.json())

const routes = [userRouter, taskRouter, authRouter, avatarRouter]

routes.forEach(route => {
    app.use(route)
})

app.get('', (req, res) => {
    try {
        res.send({message: 'Welcome to the task manager api'})
    } catch(e) {
        res.status(503).send()
    }
})

module.exports = app