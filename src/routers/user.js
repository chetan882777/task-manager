const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token )
        await req.user.save()

        res.send()

    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth,  async (req, res) => {
    res.send(req.user)
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        console.log("user obtained")
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.send({ error: "Invalid update's!" })
    }
    try {

        updates.forEach((update) => req.user[update] = req.body[update])

        await user.save()
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
},(error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router