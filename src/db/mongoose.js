const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1/taskmanager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})


// const me = new User({
//      name: '  Chetan   ',
//      email: '  chetan@gmail.com',
//      password: ' 123456'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const Task = mongoose.model('tasks', {
    description:{
        type: String,
        required:true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})
