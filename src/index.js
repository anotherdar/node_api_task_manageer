const express = require('express')

require('./db/mongoose')

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const authRouter = require('./routes/auth')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

app.listen(port, () => console.log('server running on port: ' + port))
