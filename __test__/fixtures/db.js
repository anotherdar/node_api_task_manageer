const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const {User} = require('../../src/models/user')
const {Task} = require('../../src/models/task')


const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Dio',
    email: 'jhotharo@mail.com',
    password: 'Red!123%$',
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Dio',
    email: 'user@mail.com',
    password: 'Red!123%$',
    tokens: [{
        token: jwt.sign({_id: userTwoID}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first task',
    completed: false,
    owner: userOneID
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: false,
    owner: userOneID
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'third task',
    completed: true,
    owner: userTwo._id
}

const tasks = [
    taskOne,
    taskTwo,
    taskThree
]

const users = [
    userOne,
    userTwo
]
const setUpDatabase = async () => {
    await User.deleteMany({})
    users.forEach(async user => {
        await new User(user).save()
    })
    
    await Task.deleteMany({})
    tasks.forEach(async task => {
        await new Task(task).save()
    })
    
}

module.exports = {
    userOne,
    userOneID,
    setUpDatabase,
    userTwo,
    userTwoID,
    taskOne,
    taskTwo,
    taskThree
}