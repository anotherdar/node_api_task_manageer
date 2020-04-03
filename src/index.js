const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

require('./db/mongoose')

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const authRouter = require('./routes/auth')
const avatarRouter = require('./routes/avatar')

const app = express()
const port = process.env.PORT

app.use(express.json())

const routes = [userRouter, taskRouter, authRouter, avatarRouter]

routes.forEach(route => {
    app.use(route)
})

app.get('', (req, res) => {
    try {
        res.send({welcome: 'To task manager api'})
    } catch (e) {
        res.status(500).send()
    }
})


app.listen(port, () => console.log('server running on port: ' + port))
