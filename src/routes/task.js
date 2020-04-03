const express = require('express')
const router = new express.Router()

const { Task } = require('../models/task')
const {isValidToUpdate} = require('../../utils/IsValidToUpdate')

const {auth} = require('../middleware/auth')

//add task
router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

//get tasks
router.get('/tasks', auth,async (req, res) => {
   const match = {}

   if(req.query.completed) {
    match.completed = req.query.completed === 'true'
   }

    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//get task
router.get('/task/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send({error: 'Task not found'})
        }

        res.send(task)        
    } catch (e) {
        res.status(500).send()
    }
})

//update task
router.put('/task/:id',auth, async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)

    if(!isValidToUpdate(req.body, allowedUpdates)) {
        return res.status(400).send({error: 'the following property does not exist on task model'})
    }

    try {
       const task = await Task.findOne({_id, owner: req.user._id})
       if(!task) return res.status(404).send({error: 'Task not found'})

       updates.forEach(update => task[update] = req.body[update])
       await task.save(task)

        res.send(task)
    } catch (error) {
        res.status(404).send()
    }   
})

//delete task
router.delete('/task/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user.id})

        if(!task) return res.status(404).send({error: 'Task not found!'})

        res.send({message: 'Deleted!'})
        
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router