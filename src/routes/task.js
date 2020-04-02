const express = require('express')
const router = new express.Router()

const { Task } = require('../models/task')
const {isValidToUpdate} = require('../../utils/IsValidToUpdate')

router.post('/task', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/task/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)

        if(!task) return res.status(404).send()

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/task/:id', async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)

    if(!isValidToUpdate(req.body, allowedUpdates)) {
        return res.status(400).send({error: 'the following property does not exist on task model'})
    }

    try {
       const task = await Task.findById(_id)
       updates.forEach(update => task[update] = req.body[update])
       await task.save(task)

        if(!task) return res.status(404).send()

        res.send(task)
    } catch (error) {
        res.status(404).send()
    }   
})

router.delete('/task/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if(!task) return res.status(404).send({error: 'Task not found!'})

        res.send(task)
        
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router