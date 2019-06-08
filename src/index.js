const express = require('express')
require('./db/mongoose')
const User = require("./models/user")
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.send(500).send(e)
    }
})



app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            res.send.status(404).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.send({error :"Invalid update's!"})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.send({error :"Invalid update's!"})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


app.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

