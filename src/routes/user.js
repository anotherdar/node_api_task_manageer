const express = require('express')
const router = new express.Router()

const {sendCancellationEmail} = require('../emails/account')

const {isValidToUpdate} = require('../../utils/IsValidToUpdate')
const { auth } = require('../middleware/auth')

//get users 
router.get('/user/me', auth ,async (req, res) => {
    res.send(req.user)
})
  
//update user
router.put('/user/me', auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    if(!isValidToUpdate(req.body, allowedUpdates)) {
        return res.status(400).send({error: 'Invalid update, the following property does not exit on user'})
    }

    try {
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

//delete user
router.delete('/user/me', auth , async (req, res) => {
    try{
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)

    } catch(e) {
        res.status(500).send(e)
    }
})



module.exports = router