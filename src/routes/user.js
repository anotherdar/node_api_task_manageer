const express = require('express')
const router = new express.Router()

const {User} = require('../models/user')
const {isValidToUpdate} = require('../../utils/IsValidToUpdate')

router.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(err) {
        res.status(400).send(err)
    }
})
 
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})
 
router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
       const user = await User.findById(_id)
       
       if(!user) return res.status(404).send()

       res.send(user)

    } catch(e) {
        res.status(500).send()
    }
})
 
router.put('/user/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    if(!isValidToUpdate(req.body, allowedUpdates)) {
        return res.status(400).send({error: 'Invalid update, the following property does not exit on user'})
    }

    try {
        const user = await User.findById(_id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user) return res.status(404).send()

        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/user/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findByIdAndDelete(_id)

        if(!user) return res.status(404).send({error: 'User not found'})

        res.send(user)

    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router