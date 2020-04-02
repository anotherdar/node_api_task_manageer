const express = require('express')

require('./db/mongoose')

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log('server running on port: ' + port))

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red123!$'
//     const hashPassword = await bcrypt.hash(password, 8)


//     console.log(password)
//     console.log(hashPassword)


//     const isMatch = await bcrypt.compare(password, hashPassword)

//     console.log(isMatch)
// }

// myFunction()